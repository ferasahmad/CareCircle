import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PostAction from "./PostAction";
import formatDate from "@/utilities/formatDate";

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const handleHugPress = () => {
    console.log("hug");
  };

  const handleCommentPress = () => {
    console.log("comment");
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.description} numberOfLines={4}>
          {post.patient_description}
        </Text>
        <LinearGradient
          colors={["transparent", "#fff"]}
          style={styles.gradient}
        />
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.actionsContainer}>
          <PostAction
            imageSrc={require("../assets/images/heart.png")}
            label={`${post.num_hugs} Hugs`}
            onPress={handleHugPress}
          />
          <PostAction
            imageSrc={require("../assets/images/comment.png")}
            label="Comment"
            onPress={handleCommentPress}
          />
        </View>
        <Text style={styles.date}>{formatDate(post.created_at)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  textContainer: {
    position: "relative",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    lineHeight: 22,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 14,
    color: "#343434",
  },
});

export default Post;
