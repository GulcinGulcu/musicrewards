import React, { useMemo } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useThemeStore } from "../../stores/themeStore";
import { ThemeColors } from "../../types";

export const PageLoader = () => {
  const { colors } = useThemeStore();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
  });