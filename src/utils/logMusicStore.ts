import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export async function logAllStorage() {
  try {
    const keys = ["music-storage", "user-storage", "theme-storage"];
    const results = await AsyncStorage.multiGet(keys);

    // JSON parse & format
    const parsedData = results.map(([key, value]) => {
      if (!value) return `${key}: (empty)`;
      try {
        return `${key}: ${JSON.stringify(JSON.parse(value), null, 2)}`;
      } catch {
        return `${key}: (invalid JSON)`;
      }
    });

    const message = parsedData.join("\n\n");

    console.log("Persisted storages:\n", message);
    Alert.alert("Persisted Data", message);
  } catch (err) {
    console.warn("Failed to read storages:", err);
    Alert.alert("Error", "Failed to read persisted data.");
  }
}