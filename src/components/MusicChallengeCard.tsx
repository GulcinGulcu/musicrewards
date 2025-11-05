import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gradientColors } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import OutlineBadge from "./ui/OutlineBadge";
import GlassButton from "./ui/GlassButton";
import { useProgress } from "react-native-track-player";
import { useMusicStore } from "../stores/musicStore";
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { useRef, useEffect, useMemo } from "react";
import { useThemeStore } from "../stores/themeStore";
import { formatDuration } from "../utils/formatDuration";
import { ThemeColors } from "../types";

interface MusicChallangeCardProps {
  challenge: {
    id: string;
    title: string;
    artist: string;
    duration: number;
    points: number;
    audioUrl: string;
    completed: boolean;
    progress: number;
    description: string;
    difficulty?: "easy" | "medium" | "hard";
  };
}

const { width } = Dimensions.get("window");

const MusicChallangeCard = ({ challenge }: MusicChallangeCardProps) => {
  const pulse = useRef(new Animated.Value(1)).current;

  const { play, isPlaying, currentTrack } = useMusicPlayer();

  const progress = useProgress();

  const positions = useMusicStore((s) => s.positions);
  const { colors, mode } = useThemeStore();

  const styles = useMemo(() => getStyles(colors), [colors]);

  const isCurrent = currentTrack?.id === challenge.id;
  const isCompleted = !!challenge.completed;

  const positionToShow = isCurrent
    ? progress.position
    : positions[challenge.id] ?? 0;
  const durationToUse = isCurrent
    ? progress.duration || challenge.duration
    : challenge.duration;
  const progressPercent =
    durationToUse > 0 ? (positionToShow / durationToUse) * 100 : 0;

  useEffect(() => {
    const shouldPulse = !challenge.completed && !(isCurrent && isPlaying);

    if (shouldPulse) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.06,
            duration: 600,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1.0,
            duration: 600,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    } else {
      pulse.stopAnimation(() => pulse.setValue(1));
    }
  }, [challenge.completed, isCurrent, isPlaying, pulse]);

  const handlePressPlay = () => {
    if (isCompleted) return;
    play(challenge);
  };

  return (
    <View
      style={[
        styles.musicChallangeCardContainer,
        mode === "light" && {
          borderWidth: 1,
          borderColor: colors.surfaceLight,
        },
      ]}
    >
      <View style={styles.musicChallangeCardHeader}>
        <OutlineBadge label={challenge.difficulty} />
      </View>

      <View style={styles.musicChallangeCardInfo}>
        <Text style={styles.musicChallangeCardTitle}>{challenge.title}</Text>
        <Text style={styles.musicChallangeCardDescription}>
          {challenge.artist}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() => {}}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="shuffle-outline" color={colors.grey} size={20} />
        </TouchableOpacity>

        <GlassButton
          icon={
            <Ionicons
              name="play-skip-back-outline"
              color={colors.grey}
              size={25}
            />
          }
          onPress={() => {}}
        />

        <TouchableOpacity
          onPress={handlePressPlay}
          activeOpacity={isCompleted ? 1 : 0.8}
          disabled={isCompleted}
        >
          <Animated.View style={{ transform: [{ scale: pulse }] }}>
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.playButtonContainer,
                isCompleted && { opacity: 0.5 },
              ]}
            >
              {isCompleted ? (
                <Ionicons name="checkmark" color={colors.white} size={42} />
              ) : (
                <Ionicons
                  name={isPlaying && isCurrent ? "pause" : "play"}
                  color={colors.white}
                  size={45}
                />
              )}
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>

        <GlassButton
          icon={
            <Ionicons
              name="play-skip-forward-outline"
              color={colors.grey}
              size={25}
            />
          }
          onPress={() => console.log("Touched")}
        />

        <TouchableOpacity
          onPress={() => {}}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="repeat-outline" color={colors.grey} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercent}%`,
                backgroundColor:
                  progressPercent > 90
                    ? colors.primary
                    : isCurrent
                    ? colors.primary
                    : colors.surfaceLight,
              },
            ]}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Text
            style={[
              styles.currentTime,
              isCurrent ? styles.visible : styles.dimmed,
            ]}
          >
            {formatDuration(positionToShow)}
          </Text>
          <Text
            style={[
              styles.totalTime,
              isCurrent ? styles.visible : styles.dimmed,
            ]}
          >
            {formatDuration(durationToUse)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    musicChallangeCardContainer: {
      width: width - 32,
      alignSelf: "center",
      paddingHorizontal: 20,
      paddingVertical: 24,
      borderRadius: 16,
      backgroundColor: colors.surface,
      marginBottom: 12,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    musicChallangeCardInfo: {
      flex: 1,
      flexShrink: 1,
      alignItems: "center",
    },
    musicChallangeCardDescription: {
      fontSize: 13,
      color: colors.grey,
      marginTop: -7,
      marginBottom: 10,
    },
    musicChallangeCardTitle: {
      color: colors.text,
      letterSpacing: 1,
      fontSize: 30,
      fontWeight: "700",
      lineHeight: 55,
      textAlign: "center",
    },
    musicChallangeCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },
    controlsContainer: {
      width: "80%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    playButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      padding: 10,
    },
    progressBarContainer: {
      marginTop: 16,
      width: "100%",
    },
    progressBar: {
      height: 6,
      borderRadius: 4,
      backgroundColor: colors.grey,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 4,
    },
    currentTime: {
      color: colors.text,
      fontSize: 12,
    },
    totalTime: {
      color: colors.text,
      fontSize: 12,
    },
    dimmed: { opacity: 0.5 },
    visible: { opacity: 1 },
  });

export default MusicChallangeCard;
