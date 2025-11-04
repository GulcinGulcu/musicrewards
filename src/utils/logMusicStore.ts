import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export async function logMusicStorage() {
  try {
    const raw = await AsyncStorage.getItem("music-storage");

    if (!raw) {
      console.log("Music storage is empty or not found.");
      Alert.alert("Empty", "No saved data found in AsyncStorage.");
      return;
    }

    const parsed = JSON.parse(raw);
    console.log("Music storage:", parsed);
    Alert.alert("Persisted Data", JSON.stringify(parsed, null, 2));
  } catch (err) {
    console.warn("Failed to read music storage:", err);
  }
}
