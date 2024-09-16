import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";

interface GenericWrapperProps {
  children: React.ReactNode;
}

export default function GenericWrapper({ children }: GenericWrapperProps) {
  return (
    <LinearGradient
      colors={["#F6FFDA", "#FEFAE1"]}
      style={styles.gradientBackground}
    >
      <View style={styles.contentWrapper}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
