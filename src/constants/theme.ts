export const SAMPLE_CHALLENGES = [
  {
    id: "challenge-1",
    title: "All Night",
    artist: "Camo & Krooked",
    duration: 219, // 3:39
    points: 150,
    audioUrl:
      "https://belong-dev-public2.s3.us-east-1.amazonaws.com/misc/Camo-Krooked-All-Night.mp3",
    description: "Listen to this drum & bass classic to earn points",
    difficulty: "easy" as const,
    completed: false,
    progress: 0,
  },
  {
    id: "challenge-2",
    title: "New Forms",
    artist: "Roni Size",
    duration: 464, // 7:44
    points: 300,
    audioUrl:
      "https://belong-dev-public2.s3.us-east-1.amazonaws.com/misc/New-Forms-Roni+Size.mp3",
    description: "Complete this legendary track for bonus points",
    difficulty: "medium" as const,
    completed: false,
    progress: 0,
  },
];

export const COLORS = {
  primary: "#D50C86",
  secondary: "#EB264D",
  background: "#000000",
  surface: "#1A1A1A",
  surfaceLight: "#2A2A2A",
  white: "#FFFFFF",
  grey: "#9CA3AF",
} as const;
