import React, { useMemo } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { gradientColors } from "../../constants/theme";
import { useThemeStore } from "../../stores/themeStore";
import { StyleSheet } from "react-native";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    position: "absolute" as const,
    elevation: 0,
    height: 40,
    paddingBottom: 8,
  },
});

export default function TabsLayout() {
  const { colors } = useThemeStore();

  const screenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: gradientColors[1],
      tabBarInactiveTintColor: colors.grey,
      tabBarShowLabel: false,
      tabBarStyle: [styles.tabBar, { backgroundColor: colors.background }],
    }),
    [colors]
  );

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
