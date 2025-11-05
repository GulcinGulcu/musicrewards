import { useLocalSearchParams, router } from "expo-router";
import { useMusicStore } from "../../stores/musicStore";
import BaseModal from "../../components/BaseModal";

export default function ChallengeStartModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const challenges = useMusicStore((state) => state.challenges);
  const challenge = challenges.find((c) => c.id === id);

  return (
    <BaseModal
      title="Challenge has started! 🔥"
      message={`Listen to that song and get ${challenge?.points} points!`}
      trackInfo={`${challenge?.title} • ${challenge?.artist}`}
      buttonLabel="GOT IT!"
      onClose={() => router.back()}
    />
  );
}
