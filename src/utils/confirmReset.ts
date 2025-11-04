import { useMusicStore } from "../stores/musicStore";
import { Alert } from "react-native";

export function useConfirmReset() {
  const hardReset = useMusicStore((s) => s.hardReset);

  const confirmReset = async (opts?: { quick?: boolean }) => {
    // if "quick" flag is true, show a simpler dialog for Profile
    if (opts?.quick) {
      Alert.alert(
        "Start over?",
        "Your current progress will be cleared.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes, start over",
            style: "destructive",
            onPress: async () => {
              await hardReset();
              Alert.alert("Progress cleared ✅");
            },
          },
        ]
      );
      return;
    }

    // default: detailed Settings version
    Alert.alert(
      "Reset all data?",
      "This will delete your progress and saved track positions. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, reset everything",
          style: "destructive",
          onPress: async () => {
            await hardReset();
            Alert.alert("Data has been reset ✅");
          },
        },
      ]
    );
  };

  return { confirmReset };
}