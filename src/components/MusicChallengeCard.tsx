import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import OutlineBadge from "./ui/Badge";
import { handlePlay } from "../utils/handlePlay";
import GlassButton from "./ui/GlassButton";
import { Dimensions, StyleSheet } from "react-native";

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
  return (
    <View style={styles.musicChallangeCardContainer}>
      <View style={styles.musicChallangeCardHeader}>
        <OutlineBadge label={challenge.difficulty} />
        <Text style={{ color: COLORS.white }}>
          {formatDuration(challenge.duration)}
        </Text>
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePlay(challenge)}
        >
          <LinearGradient
            colors={["#D50C86", "#E41A6E", "#EB264D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.playButtonContainer}
          >
            <Ionicons name="play" color={COLORS.white} size={45}></Ionicons>
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
    </View>
  );
};

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  musicChallangeCardContainer: {
    width: width - 32,
    marginHorizontal: "auto",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    borderRadius: 12,
    marginBottom: 8,
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
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 55,
    textAlign: "center",
  },
  musicChallangeCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  playButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
  },
  controlsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MusicChallangeCard;
