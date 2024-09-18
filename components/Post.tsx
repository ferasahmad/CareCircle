import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PostAction from "./PostAction";
import formatDate from "@/utilities/formatDate";
import { useHugPost } from "@/hooks/useHugPost";
import { router } from "expo-router";

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [numHugs, setNumHugs] = useState(post.num_hugs);
  const { toggleHugPost, error } = useHugPost();
  const [hasHugged, setHasHugged] = useState(false);

  const handleHugPress = async () => {
    const updatedPost = await toggleHugPost(post.id, numHugs);
    if (!updatedPost) {
      Alert.alert("Error", error || "Failed to send hug.");
    } else {
      setNumHugs(updatedPost.num_hugs);
      setHasHugged(!hasHugged);
    }
  };

  const handleCommentPress = () => {
    console.log("comment");
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/post-details",
          params: {
            postId: post.id.toString(),
          },
        })
      }
    >
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.description} numberOfLines={4}>
          {post.patient_description}
        </Text>
        <LinearGradient
          colors={["transparent", "#FEFAE1"]}
          style={styles.gradient}
        />
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.actionsContainer}>
          <PostAction
            imageSrc={
              hasHugged
                ? require("../assets/images/heart-filled.png")
                : require("../assets/images/heart.png")
            }
            label={numHugs}
            onPress={handleHugPress}
          />
          <PostAction
            imageSrc={require("../assets/images/comment.png")}
            label={Object.keys(post.comments).length}
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
