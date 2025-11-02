import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useMusicStore } from "../../stores/musicStore";
import { COLORS } from "../../constants/theme";
import { StyleSheet } from "react-native";
import NeonButton from "../../components/ui/NeonButton";

export default function ChallengeStartModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const challenges = useMusicStore((state) => state.challenges);
  const challenge = challenges.find((c) => c.id === id);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Challenge has started!🔥</Text>
        <Text style={styles.modalText}>
          Listen to that song and get {challenge?.points} points!
        </Text>
        <Text style={styles.modalTrackInfo}>
          {challenge?.title} • {challenge?.artist}
        </Text>
        <NeonButton title="GOT IT!" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 22,
    width: "90%",
    alignItems: "center",
    paddingVertical: 42,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "400",
    marginBottom: 12,
  },
  modalTrackInfo: {
    color: COLORS.grey,
    marginBottom: 24,
    fontSize: 18,
  },
  modalText: {
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 32,
    fontWeight: "400",
    textAlign: "center",
  },
});
