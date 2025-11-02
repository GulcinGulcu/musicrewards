import { View, Text, FlatList, ImageBackground } from "react-native";
import { styles } from "../../styles/home.styles";
import { useMusicStore } from "../../stores/musicStore";
import MusicCard from "../../components/MusicChallengeCard";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import NeonButton from "../../components/ui/NeonButton";

export default function Index() {
  const challenges = useMusicStore((state) => state.challenges);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="headset" size={26} color={COLORS.white} />
      </View>
      <ImageBackground
        source={{
          uri: "https://cdn.pixabay.com/photo/2025/10/29/10/57/abstract-9924731_1280.jpg",
        }}
        style={styles.heroSectionBackground}
      >
        <View style={styles.heroSectionOverlay} />
        <View style={styles.heroSectionContent}>
          <Text style={styles.heroSectionContentTitle}>Sound Boost</Text>
          <Text style={styles.heroSectionContentSubtitle}>
            Feel the rhythm, earn the vibe.
          </Text>
          <NeonButton title="Listen Now" onPress={() => {}} />
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
