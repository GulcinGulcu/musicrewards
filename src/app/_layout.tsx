import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { setupPlayer } from "../services/trackPlayerService";

export default function RootLayout() {
  useEffect(() => {
    setupPlayer();
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
