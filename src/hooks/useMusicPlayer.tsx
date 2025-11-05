import { useMusicStore } from "../stores/musicStore";
import { MusicChallenge } from "../types";
import { useUserStore } from "../stores/userStore";
import { useState, useRef, useEffect, useCallback } from "react";
import TrackPlayer, {
  useProgress,
  useIsPlaying,
  useActiveTrack,
} from "react-native-track-player";
import { useRouter } from "expo-router";

const COMPLETE_THRESHOLD = 0.9;

export type UseMusicPlayerReturn = {
  isPlaying: boolean;
  currentTrack: MusicChallenge | null;
  loading: boolean;
  error: string | null;
  play: (challenge: MusicChallenge) => Promise<void>;
  pause: () => Promise<void>;
};

export function useMusicPlayer(): UseMusicPlayerReturn {
  const active = useActiveTrack();

  const router = useRouter();

  const progress = useProgress();
  const { playing } = useIsPlaying();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentTrack = useMusicStore((s) => s.currentTrack);
  const setCurrentTrack = useMusicStore((s) => s.setCurrentTrack);
  const setIsPlaying = useMusicStore((s) => s.setIsPlaying);
  const updateProgress = useMusicStore((s) => s.updateProgress);
  const markChallengeComplete = useMusicStore((s) => s.markChallengeComplete);
  const saveTrackPosition = useMusicStore((s) => s.saveTrackPosition);
  const getSavedTrackPosition = useMusicStore((s) => s.getSavedTrackPosition);

  const completeChallenge = useUserStore((s) => s.completeChallenge);

  // prevent double awarding
  const awardedForIdRef = useRef<string | null>(null);

  // update progress in store
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
    if (progress.position < 0.2) return;
    saveTrackPosition(active.id, progress.position);
  }, [active?.id, progress.position, saveTrackPosition]);

  useEffect(() => {
    if (!active?.id) return;

    const ended =
      progress.duration > 0 &&
      progress.position / progress.duration >= COMPLETE_THRESHOLD;

    const ch = useMusicStore
      .getState()
      .challenges.find((c) => c.id === active.id);
    const alreadyCompleted = !!ch?.completed;

    if (ended && !alreadyCompleted && awardedForIdRef.current !== active.id) {
      if (ch) {
        markChallengeComplete(ch.id);
        completeChallenge(ch.id, ch.points);
        awardedForIdRef.current = active.id;
        setIsPlaying(false);
        router.push({
          pathname: "/(modals)/challenge-success",
          params: { id: active.id },
        });
      }
    }
  }, [
    active?.id,
    progress.position,
    progress.duration,
    completeChallenge,
    markChallengeComplete,
    setIsPlaying,
  ]);

  // one ref per hook: has the start modal already been shown for this ID?
  const shownStartForIdRef = useRef<Set<string>>(new Set());

  const play = useCallback(
    async (challenge: MusicChallenge) => {
      if (loading) return;

      try {
        setLoading(true);
        setError(null);

        const isCurrent = currentTrack?.id === challenge.id;

        // 1) Already completed: don’t re-award, just show success modal
        if (challenge.completed) {
          awardedForIdRef.current = challenge.id;
          router.push({
            pathname: "/(modals)/challenge-success",
            params: { id: challenge.id },
          });
          return;
        }

        // 2) Same card tapped again: toggle play/pause
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

        // 3) Safely save previous track’s position (current logic)
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

        // 4) Allow reward again (this track isn’t completed yet)
        awardedForIdRef.current = null;

        // 5) Add to or skip in queue
        let queue = await TrackPlayer.getQueue();
        let index = queue.findIndex((t) => t.id === challenge.id);

        // *** INFO NEEDED FOR START MODAL CONDITION ***
        const savedPos = getSavedTrackPosition(challenge.id) ?? 0;
        const hasProgress = (challenge.progress ?? 0) > 0.5 || savedPos > 0.2;
        const firstTimePlay = !hasProgress && !challenge.completed;
        const alreadyShown = shownStartForIdRef.current.has(challenge.id);

        if (index === -1) {
          await TrackPlayer.add({
            id: challenge.id,
            url: challenge.audioUrl,
            title: challenge.title,
            artist: challenge.artist,
          });
          queue = await TrackPlayer.getQueue();
          index = queue.length - 1;

          // *** SHOW START MODAL ONLY ON FIRST REAL PLAY ***
          if (firstTimePlay && !alreadyShown) {
            shownStartForIdRef.current.add(challenge.id);
            router.push({
              pathname: "/(modals)/challenge-start",
              params: { id: challenge.id },
            });
          }
        }

        await TrackPlayer.skip(index);

        // 6) Prevent auto-next
        try {
          await TrackPlayer.removeUpcomingTracks();
        } catch {}

        if (savedPos > 0.2) {
          await TrackPlayer.seekTo(savedPos);
          const dur =
            progress.duration > 0 ? progress.duration : challenge.duration;
          const pct = dur > 0 ? Math.min(100, (savedPos / dur) * 100) : 0;
          updateProgress(challenge.id, pct);
        } else {
          await TrackPlayer.seekTo(0);
        }

        await TrackPlayer.play();

        setCurrentTrack(challenge);
        setIsPlaying(true);
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Playback failed";
        setError(msg);
        console.warn("Error playing track:", error);
      } finally {
        setLoading(false);
      }
    },
    [
      loading,
      currentTrack?.id,
      playing,
      progress.position,
      progress.duration,
      getSavedTrackPosition,
      saveTrackPosition,
      updateProgress,
      setCurrentTrack,
      setIsPlaying,
      router,
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
