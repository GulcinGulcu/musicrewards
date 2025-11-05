import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import TrackPlayer from "react-native-track-player";
import { setupPlayer } from "../services/playbackService";
import { Platform } from "react-native";
import { useThemeStore } from "../stores/themeStore";
import { PageLoader } from "../components/ui/PageLoader";
import { StatusBar } from "expo-status-bar";

TrackPlayer.registerPlaybackService(
  () => require("../services/playbackService").default
);

export default function RootLayout() {
  const hasHydrated = useThemeStore.persist.hasHydrated();
  const { colors, mode } = useThemeStore();

  useEffect(() => {
    setupPlayer().catch((error) => {
      console.error("Failed to setup TrackPlayer:", error);
    });
  }, []);

  if (!hasHydrated) return <PageLoader />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="(modals)"
            options={{
              presentation:
                Platform.OS === "android"
                  ? "containedTransparentModal"
                  : "transparentModal",
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </Stack>
      </SafeAreaView>
      <StatusBar
        style={mode === "dark" ? "light" : "dark"}
        backgroundColor={colors.background}
        translucent={false}
      />
    </SafeAreaProvider>
  );
}
