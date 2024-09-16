import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface PostActionProps {
  imageSrc: any;
  label: string | number;
  onPress: () => void;
}

const PostAction: React.FC<PostActionProps> = ({
  imageSrc,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.actionContainer} onPress={onPress}>
      <Image source={imageSrc} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  label: {
    fontSize: 14,
    color: "#343434",
  },
});

export default PostAction;
