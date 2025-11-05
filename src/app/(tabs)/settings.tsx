import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useConfirmReset } from "../../utils/confirmReset";
import { logAllStorage } from "../../utils/logMusicStore";
import { useThemeStore } from "../../stores/themeStore";
import { ThemeColors } from "../../types";

export default function SettingsScreen() {
  const router = useRouter();
  const { confirmReset } = useConfirmReset();
  const { colors, mode } = useThemeStore();

  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={24} color={colors.grey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>App Controls</Text>

      <TouchableOpacity
        onPress={() => confirmReset()}
        style={[
          styles.resetButton,
          mode === "light" && {
            borderWidth: 1,
            borderColor: colors.surfaceLight,
          },
        ]}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={22} color={colors.danger} />
        <Text style={styles.resetText}>Hard Reset (clear all data)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => logAllStorage()}
        style={[
          styles.logPersist,
          mode === "light" && {
            borderWidth: 1,
            borderColor: colors.surfaceLight,
          },
        ]}
      >
        <Ionicons name="analytics" size={22} color={colors.text} />
        <Text style={styles.logPersistAlt}>Log persisted data</Text>
      </TouchableOpacity>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      borderBottomColor: colors.surfaceLight,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "500",
      color: colors.text,
    },
    sectionTitle: {
      fontSize: 18,
      color: colors.grey,
      marginTop: 10,
      marginBottom: 4,
      fontWeight: "600",
    },
    resetButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 18,
      gap: 10,
    },
    resetText: {
      color: colors.danger,
      fontSize: 16,
      fontWeight: "500",
    },
    logPersist: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 18,
      gap: 10,
    },
    logPersistAlt: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "500",
    },
  });
