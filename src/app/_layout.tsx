import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import TrackPlayer from "react-native-track-player";
import { setupPlayer } from "../services/playbackService";

TrackPlayer.registerPlaybackService(() =>
  require("../services/playbackService").default
);

export default function RootLayout() {
  useEffect(() => {
    setupPlayer().catch((error) => {
      console.error("Failed to setup TrackPlayer:", error);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="(modals)"
            options={{
              presentation: "transparentModal",
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
