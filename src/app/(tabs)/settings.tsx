import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useRouter } from "expo-router";
import { useConfirmReset } from "../../utils/confirmReset";
import { logMusicStorage } from "../../utils/logMusicStore";

export default function SettingsScreen() {
  const router = useRouter();
  const { confirmReset } = useConfirmReset();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={24} color={COLORS.grey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>App Controls</Text>

      <TouchableOpacity
        onPress={() => confirmReset()}
        style={styles.resetButton}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={22} color={COLORS.danger} />
        <Text style={styles.resetText}>Hard Reset (clear all data)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => logMusicStorage()}
        style={styles.logPersist}
      >
        <Ionicons name="analytics" size={22} color={COLORS.white} />
        <Text style={styles.logPersistAlt}>Log persisted data</Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    rowGap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.white,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.grey,
    marginTop: 10,
    marginBottom: 4,
    fontWeight: "600",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 10,
  },
  resetText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: "500",
  },
  logPersist: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 10,
  },
  logPersistAlt: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "500",
  },
});
