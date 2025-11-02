import MusicChallangeCard from "../components/MusicChallengeCard";
import { COLORS } from "../constants/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: "relative",
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 400,
    letterSpacing: 1.8,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    color: COLORS.primary,
  },
  heroSectionBackground: {
    height: 280,
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
    color: COLORS.white,
    fontFamily: "inter",
    fontWeight: 600,
    letterSpacing: 1.2,
    fontSize: 35,
    marginBottom: 8,
  },
  heroSectionContentSubtitle: {
    color: COLORS.white,
    fontFamily: "inter",
    fontWeight: 300,
    fontSize: 16,
    marginBottom: 32,
  },
});
