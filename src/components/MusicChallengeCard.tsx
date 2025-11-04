import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, gradientColors } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import OutlineBadge from "./ui/Badge";
import GlassButton from "./ui/GlassButton";
import { Dimensions, StyleSheet } from "react-native";
import { useProgress } from "react-native-track-player";
import { useMusicStore } from "../stores/musicStore";
import { useChallengePlayer } from "../hooks/useMusicPlayer";

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

const MusicChallangeCard = ({ challenge }: MusicChallangeCardProps) => {
  const { play, isPlaying, currentTrack } = useChallengePlayer();
  const progress = useProgress();
  const positions = useMusicStore((s) => s.positions);

  const isCurrent = currentTrack?.id === challenge.id;

  const positionToShow = isCurrent
    ? progress.position
    : positions[challenge.id] ?? 0;
  const durationToUse = isCurrent
    ? progress.duration || challenge.duration
    : challenge.duration;
  const progressPercent =
    durationToUse > 0 ? (positionToShow / durationToUse) * 100 : 0;

  return (
    <View style={styles.musicChallangeCardContainer}>
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
          onPress={() => console.log("touched")}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="shuffle-outline" color={COLORS.grey} size={20} />
        </TouchableOpacity>
        <GlassButton
          icon={
            <Ionicons
              name="play-skip-back-outline"
              color={COLORS.grey}
              size={25}
            />
          }
          onPress={() => console.log("touched")}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={() => play(challenge)}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.playButtonContainer}
          >
            <Ionicons
              name={isPlaying && isCurrent ? "pause" : "play"}
              color={COLORS.white}
              size={45}
            />
          </LinearGradient>
        </TouchableOpacity>
        <GlassButton
          icon={
            <Ionicons
              name="play-skip-forward-outline"
              color={COLORS.grey}
              size={25}
            />
          }
          onPress={() => console.log("touched")}
        />
        <TouchableOpacity
          onPress={() => console.log("touched")}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="repeat-outline" color={COLORS.grey} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercent}%`,
                backgroundColor: isCurrent
                  ? COLORS.primary
                  : COLORS.surfaceLight,
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

function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  musicChallangeCardContainer: {
    width: width - 32,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderRadius: 16,
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
    color: COLORS.grey,
    marginTop: -7,
    marginBottom: 10,
  },
  musicChallangeCardTitle: {
    color: COLORS.white,
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
    backgroundColor: COLORS.grey,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  currentTime: {
    color: "#fff",
    fontSize: 12,
  },
  totalTime: {
    color: "#fff",
    fontSize: 12,
  },
  dimmed: {
    opacity: 0.5,
  },
  visible: {
    opacity: 1,
  },
});

export default MusicChallangeCard;
