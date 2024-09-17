import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";

interface GenericWrapperProps {
  children: React.ReactNode;
}

export default function GenericWrapper({ children }: GenericWrapperProps) {
  return (
    <View style={styles.gradientBackground}>
      <View style={styles.contentWrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    backgroundColor: "white",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
