import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useMusicStore } from "../../stores/musicStore";
import MusicCard from "../../components/MusicChallengeCard";
import { useThemeStore } from "../../stores/themeStore";
import ThemeToggle from "../../components/ui/ThemeToggle";
import { ThemeColors } from "../../types";

export default function Index() {
  const { colors, mode } = useThemeStore();
  const challenges = useMusicStore((state) => state.challenges);
  const styles = useMemo(() => getStyles(colors), [colors]);

  const backgroundSource =
    mode === "dark"
      ? {
          uri: "https://cdn.pixabay.com/photo/2025/10/29/10/57/abstract-9924731_1280.jpg",
        }
      : require("../../../assets/white-bg.png");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemeToggle />
      </View>
      <ImageBackground
        source={backgroundSource}
        style={styles.heroSectionBackground}
      >
        {mode === "dark" && <View style={styles.heroSectionOverlay} />}
        <View style={styles.heroSectionContent}>
          <Text style={styles.heroSectionContentTitle}>Sound Boost</Text>
          <Text style={styles.heroSectionContentSubtitle}>
            Listen. Play. Win.
          </Text>
        </View>
      </ImageBackground>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MusicCard challenge={item} />}
        style={styles.contentContainer}
      />
    </View>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      position: "relative",
    },
    contentContainer: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    heroSectionBackground: {
      height: 200,
      justifyContent: "center",
      alignItems: "center",
    },
    heroSectionOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    heroSectionContent: {
      zIndex: 1,
      alignItems: "center",
    },
    heroSectionContentTitle: {
      color: colors.text,
      fontFamily: "inter",
      fontWeight: "600",
      letterSpacing: 1.2,
      fontSize: 35,
      marginBottom: 8,
    },
    heroSectionContentSubtitle: {
      color: colors.grey,
      fontFamily: "inter",
      fontWeight: "300",
      fontSize: 16,
      marginBottom: 32,
    },
  });
