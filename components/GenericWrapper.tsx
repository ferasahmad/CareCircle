import React from "react";
import { View, StyleSheet } from "react-native";

interface GenericWrapperProps {
  children: React.ReactNode;
}

export default function GenericWrapper({ children }: GenericWrapperProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefae0",
    justifyContent: "center",
    alignItems: "center",
  },
});
