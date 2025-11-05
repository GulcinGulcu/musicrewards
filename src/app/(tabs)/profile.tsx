import React, { useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { useUserStore } from "../../stores/userStore";
import { useMusicStore } from "../../stores/musicStore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NeonButton from "../../components/ui/NeonButton";
import ConfettiCannon from "react-native-confetti-cannon";
import { useThemeStore } from "../../stores/themeStore";
import { ThemeColors } from "../../types";
import { useConfirmReset } from "../../utils/confirmReset";

export default function Profile() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { colors, mode } = useThemeStore();
  const { confirmReset } = useConfirmReset();

  const hasHydrated = useUserStore.persist.hasHydrated();

  const level = useUserStore((s) => s.level);
  const totalPoints = useUserStore((s) => s.totalPoints);
  const challenges = useMusicStore((s) => s.challenges);

  const confettiRef = useRef<ConfettiCannon | null>(null);

  const { totalSongs, listenedCount, remaining } = useMemo(() => {
    const total = challenges.length;
    const listened = challenges.filter((c) => c.completed).length;
    return {
      totalSongs: total,
      listenedCount: listened,
      remaining: Math.max(0, total - listened),
    };
  }, [challenges]);

  useEffect(() => {
    if (remaining === 0 && confettiRef.current) confettiRef.current.start();
  }, [remaining, hasHydrated]);

  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={colors.grey}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.userProfileImageContainer}>
          <Image
            source={require("../../../assets/placeholder-user.png")}
            style={styles.userProfileImage}
          />
          <Text style={styles.userProfileText}>Hello, music lover!</Text>
        </View>

        <View
          style={[
            styles.levelContainer,
            mode === "light" && {
              borderWidth: 1,
              borderColor: colors.surfaceLight,
            },
          ]}
        >
          <Text style={styles.label}>Level</Text>
          <Text style={styles.labelInfo}>{level}</Text>
        </View>

        <View
          style={[
            styles.levelContainer,
            mode === "light" && {
              borderWidth: 1,
              borderColor: colors.surfaceLight,
            },
          ]}
        >
          <Text style={styles.label}>Total Points</Text>
          <Text style={styles.labelInfo}>{totalPoints}</Text>
        </View>

        <View
          style={[
            styles.levelContainer,
            mode === "light" && {
              borderWidth: 1,
              borderColor: colors.surfaceLight,
            },
          ]}
        >
          <Text style={styles.label}>Total Challenges</Text>
          <Text style={styles.labelInfo}>{totalSongs}</Text>
        </View>

        <View
          style={[
            styles.levelContainer,
            mode === "light" && {
              borderWidth: 1,
              borderColor: colors.surfaceLight,
            },
          ]}
        >
          <Text style={styles.label}>Completed Challenges</Text>
          <Text style={styles.labelInfo}>{listenedCount}</Text>
        </View>

        <NeonButton
          title={
            remaining > 0
              ? `${remaining} more to go! 🚀`
              : "All challenges completed! 🎉"
          }
          onPress={() => router.push("/(tabs)")}
          style={{ marginTop: 50 }}
        />
        <TouchableOpacity
          style={styles.startOverConfirmButton}
          onPress={() => confirmReset({ quick: true })}
        >
          <Text style={styles.startOverConfirmButtonText}>Start Over?</Text>
        </TouchableOpacity>
      </ScrollView>

      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <ConfettiCannon
          autoStart={false}
          ref={confettiRef}
          count={140}
          origin={{ x: width / 2, y: 0 }}
          fadeOut
          fallSpeed={2500}
          explosionSpeed={350}
          // @ts-ignore
          fallHeight={height + 200}
        />
      </View>
    </>
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
    userProfileImageContainer: {
      alignItems: "center",
      gap: 12,
      marginVertical: 14,
    },
    userProfileImage: {
      width: 90,
      height: 90,
      borderRadius: 9999,
      backgroundColor: colors.white,
    },
    userProfileText: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "500",
    },
    levelContainer: {
      padding: 16,
      backgroundColor: colors.surface,
      borderRadius: 16,
      shadowColor: colors.background,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 18,
      elevation: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    label: {
      color: colors.text,
      fontSize: 20,
    },
    labelInfo: {
      color: colors.text,
      fontSize: 20,
    },
    startOverConfirmButton: {
      margin: "auto"
    },
    startOverConfirmButtonText: {
      color: colors.text,
      fontSize: 16,
      textDecorationLine: "underline"
    }
  });
