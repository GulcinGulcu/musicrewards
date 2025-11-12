import { useMusicStore } from "../stores/musicStore";
import { Alert } from "react-native";
import { useUserStore } from "../stores/userStore";
import { useThemeStore } from "../stores/themeStore";

export function useConfirmReset() {
  const resetMusicData = useMusicStore((s) => s.resetMusicData);
  const resetUserData = useUserStore((s) => s.resetUserData);
  const resetTheme = useThemeStore((s) => s.resetTheme);

  const confirmReset = async (opts?: { quick?: boolean }) => {
    // if "quick" flag is true, show a simpler dialog for Profile
    if (opts?.quick) {
      Alert.alert("Start over?", "Your current progress will be cleared.", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, start over",
          style: "destructive",
          onPress: async () => {
            await resetUserData();
            await resetMusicData();
            Alert.alert("Progress cleared ✅");
          },
        },
      ]);
      return;
    }

    // default: detailed Settings version
    Alert.alert(
      "Reset all data?",
      "This will delete stored progress, saved track positions and theme. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, reset everything",
          style: "destructive",
          onPress: async () => {
            await resetUserData();
            await resetMusicData();
            await resetTheme();
            Alert.alert("Data has been reset ✅");
          },
        },
      ]
    );
  };

  return { confirmReset };
}
