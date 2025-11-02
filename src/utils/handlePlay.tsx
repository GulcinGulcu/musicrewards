import TrackPlayer from "react-native-track-player";
import { useMusicStore, MusicChallenge } from "../stores/musicStore";
import { router } from "expo-router";

export async function handlePlay(challenge: MusicChallenge) {
  const {
    setCurrentTrack,
    setIsPlaying,
    updateProgress,
    currentTrack,
    isPlaying,
  } = useMusicStore.getState();

  try {
    const isCurrentTrack = currentTrack?.id === challenge.id;

    if (isCurrentTrack) {
      if (isPlaying) {
        await TrackPlayer.pause();
        setIsPlaying(false);
      } else {
        await TrackPlayer.play();
        setIsPlaying(true);
      }
      return;
    }

    await TrackPlayer.reset();

    await TrackPlayer.add({
      id: challenge.id,
      url: challenge.audioUrl,
      title: challenge.title,
      artist: challenge.artist,
    });

    await TrackPlayer.play();

    setCurrentTrack(challenge);
    setIsPlaying(true);
    updateProgress(challenge.id, 0);

    router.push({
      pathname: "/(modals)/challenge-start",
      params: { id: challenge.id },
    });

    console.log(`🎶 Playing: ${challenge.title} by ${challenge.artist}`);
  } catch (error) {
    console.warn("Error playing track:", error);
  }
}
