import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useMusicStore } from "../../stores/musicStore";
import ConfettiCannon from "react-native-confetti-cannon";
import { useWindowDimensions } from "react-native";
import BaseModal from "../../components/BaseModal";

export default function ChallengeEndModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const challenges = useMusicStore((s) => s.challenges);
  const challenge = challenges.find((c) => c.id === id);

  const { width, height } = useWindowDimensions();
  const confettiRef = useRef<ConfettiCannon | null>(null);

  useEffect(() => {
    if (confettiRef.current) confettiRef.current.start();
  }, []);

  return (
    <BaseModal
      title={"Challenge completed! 🎉"}
      message={`You've earned ${challenge?.points} points.`}
      trackInfo={`${challenge?.title} • ${challenge?.artist}`}
      buttonLabel="AWESOME!"
      onClose={() => router.back()}
    >
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <ConfettiCannon
          autoStart={false}
          ref={confettiRef}
          count={140}
          origin={{ x: width / 2, y: 0 }}
          fadeOut
          fallSpeed={2500}
          explosionSpeed={350}
          // @ts-ignore
          fallHeight={height + 200}
        />
      </View>
    </BaseModal>
  );
}
