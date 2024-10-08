import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

interface GenericWrapperProps {
  children: React.ReactNode;
}

export default function GenericWrapper({ children }: GenericWrapperProps) {
  return (
    <ScrollView
      style={{ backgroundColor: "#FEFAE1" }}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.contentContainer}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#FEFAE1",
  },
  contentContainer: {
    width: "100%",
    backgroundColor: "#FEFAE1",
    maxWidth: 700,
  },
});
