import { MusicChallenge, useMusicStore } from "../stores/musicStore";
import { useUserStore } from "../stores/userStore";
import { useState, useRef, useEffect, useCallback } from "react";
import TrackPlayer, {
  useProgress,
  useIsPlaying,
  useActiveTrack,
} from "react-native-track-player";
import { useRouter } from "expo-router";

const COMPLETE_THRESHOLD = 0.9;

export type UseChallengePlayerReturn = {
  isPlaying: boolean;
  currentTrack: MusicChallenge | null;
  loading: boolean;
  error: string | null;
  play: (challenge: MusicChallenge) => Promise<void>;
  pause: () => Promise<void>;
};

export function useChallengePlayer(): UseChallengePlayerReturn {
  const active = useActiveTrack();

  const router = useRouter();

  const progress = useProgress();
  const { playing } = useIsPlaying();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentTrack = useMusicStore((s) => s.currentTrack);
  const isPlayingStore = useMusicStore((s) => s.isPlaying);
  const setCurrentTrack = useMusicStore((s) => s.setCurrentTrack);
  const setIsPlaying = useMusicStore((s) => s.setIsPlaying);
  const updateProgress = useMusicStore((s) => s.updateProgress);
  const markChallengeComplete = useMusicStore((s) => s.markChallengeComplete);
  const saveTrackPosition = useMusicStore((s) => s.saveTrackPosition);
  const getSavedTrackPosition = useMusicStore((s) => s.getSavedTrackPosition);
  const positions = useMusicStore((s) => s.positions);

  const completeChallenge = useUserStore((s) => s.completeChallenge);

  //prevent double awarding
  const awardedForIdRef = useRef<string | null>(null);

  //update progress in store
  useEffect(() => {
    if (!active?.id) return;
    const percentage =
      progress.duration > 0
        ? Math.min(100, (progress.position / progress.duration) * 100)
        : 0;
    updateProgress(active.id, percentage);
  }, [progress.position, progress.duration, active?.id, updateProgress]);

  useEffect(() => {
    if (!active?.id) return;
    saveTrackPosition(active.id, progress.position);
  }, [active?.id, progress.position, saveTrackPosition]);

  useEffect(() => {
    if (!active?.id) return;

    const ended =
      progress.duration > 0 &&
      progress.position / progress.duration >= COMPLETE_THRESHOLD;

    if (ended && awardedForIdRef.current !== active.id) {
      const ch = useMusicStore
        .getState()
        .challenges.find((c) => c.id === active.id);
      if (ch) {
        markChallengeComplete(ch.id);
        completeChallenge(ch.id, ch.points);
      }
      awardedForIdRef.current = active.id;
      setIsPlaying(false);
    }
  }, [
    active?.id,
    progress.position,
    progress.duration,
    completeChallenge,
    markChallengeComplete,
    setIsPlaying,
  ]);

  const play = useCallback(
    async (challenge: MusicChallenge) => {
      if (loading) return;
      try {
        setLoading(true);
        setError(null);

        const isCurrent = currentTrack?.id === challenge.id;

        if (isCurrent) {
          if (playing) {
            const t = await TrackPlayer.getActiveTrack().catch(() => null);
            if (t?.id) saveTrackPosition(t.id, progress.position);
            await TrackPlayer.pause();
            setIsPlaying(false);
          } else {
            await TrackPlayer.play();
            setIsPlaying(true);
          }
          return;
        }

        const prev = await TrackPlayer.getActiveTrack().catch(() => null);
        const prevIsValid =
          !!prev?.id &&
          prev.id !== challenge.id &&
          progress.position > 0.2 &&
          useMusicStore.getState().challenges.some((c) => c.id === prev.id);

        if (prevIsValid) {
          saveTrackPosition(prev!.id, progress.position);

          const prevCh = useMusicStore
            .getState()
            .challenges.find((c) => c.id === prev!.id);
          const durPrev = prevCh?.duration ?? progress.duration;
          if (durPrev > 0) {
            const prevPct = Math.min(100, (progress.position / durPrev) * 100);
            updateProgress(prev!.id, prevPct);
          }
        }

        //reset award ref for the new song
        awardedForIdRef.current = null;

        const queue = await TrackPlayer.getQueue();
        let index = queue.findIndex((t) => t.id === challenge.id);

        if (index === -1) {
          const insertIndex = queue.length;
          await TrackPlayer.add({
            id: challenge.id,
            url: challenge.audioUrl,
            title: challenge.title,
            artist: challenge.artist,
          });
          index = insertIndex;
          updateProgress(challenge.id, 0);

          router.push({
            pathname: "/(modals)/challenge-start",
            params: { id: challenge.id },
          });
        }

        await TrackPlayer.skip(index);

        try {
          await TrackPlayer.removeUpcomingTracks();
        } catch {}

        const savedPos = getSavedTrackPosition(challenge.id);
        if (typeof savedPos === "number" && savedPos > 0.2) {
          await TrackPlayer.seekTo(savedPos);
          const dur =
            progress.duration > 0 ? progress.duration : challenge.duration;
          const pct = dur > 0 ? Math.min(100, (savedPos / dur) * 100) : 0;
          updateProgress(challenge.id, pct);
        }

        await TrackPlayer.play();

        setCurrentTrack(challenge);
        setIsPlaying(true);

        console.log(`🎶 Playing: ${challenge.title} by ${challenge.artist}`);
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Playback failed";
        setError(msg);

        console.warn("Error playing track:", error);
      } finally {
        setLoading(false);
      }
    },
    [
      currentTrack?.id,
      playing,
      setCurrentTrack,
      setIsPlaying,
      updateProgress,
      loading,
      getSavedTrackPosition,
      router,
      saveTrackPosition,
    ]
  );

  const pause = useCallback(async () => {
    const t = await TrackPlayer.getActiveTrack().catch(() => null);
    if (t?.id) saveTrackPosition(t.id, progress.position);
    await TrackPlayer.pause();
    setIsPlaying(false);
  }, [setIsPlaying, saveTrackPosition, progress.position]);

  useEffect(() => {
    setIsPlaying(playing);
  }, [playing, setIsPlaying]);

  return {
    isPlaying: playing,
    currentTrack,
    play,
    pause,
    loading,
    error,
  };
}
