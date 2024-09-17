import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { usePosts } from "@/context/PostsContext";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import GenericWrapper from "@/components/GenericWrapper";
import Markdown from "react-native-markdown-display";
import { LinearGradient } from "expo-linear-gradient";
import formatDate from "@/utilities/formatDate";
import PostAction from "@/components/PostAction";
import { useHugPost } from "@/hooks/useHugPost";

export default function PostDetails() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { posts, loading, error } = usePosts();

  const [isExpanded, setIsExpanded] = useState(false);

  const post = posts.find((p) => p.id === postId);
  const [numHugs, setNumHugs] = useState(post ? post.num_hugs : 0);
  const [hasHugged, setHasHugged] = useState(false);

  const { toggleHugPost, error: hugError } = useHugPost();

  if (!post) return <Text>Post not found</Text>;

  const handleHugPress = async () => {
    const updatedPost = await toggleHugPost(post.id, numHugs);
    if (!updatedPost) {
      Alert.alert("Error", hugError || "Failed to update hug.");
    } else {
      setNumHugs(updatedPost.num_hugs);
      setHasHugged(!hasHugged);
    }
  };

  const handleCommentPress = () => {
    console.log("comment");
  };

  return (
    <GenericWrapper>
      <ScrollView contentContainerStyle={{ padding: 15, gap: 15 }}>
        <View style={[styles.cardContainer, styles.postContent]}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.patient_description}</Text>
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
                label="Comment"
                onPress={handleCommentPress}
              />
            </View>
            <Text style={styles.date}>{formatDate(post.created_at)}</Text>
          </View>
        </View>
        <View style={[styles.cardContainer, styles.assessmentContainer]}>
          <Text style={styles.title}>Chatbot Assessment</Text>
          <Markdown>
            {isExpanded
              ? post.assessment
              : post.assessment.split("\n").slice(0, 5).join("\n")}
          </Markdown>
          {!isExpanded && (
            <TouchableOpacity
              onPress={() => setIsExpanded(true)}
              style={styles.expandButton}
            >
              <LinearGradient
                colors={["transparent", "#E6F4FC"]}
                style={styles.gradient}
              />
              <Text style={styles.expandText}>Read More</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.commentsContainer, styles.cardContainer]}>
          <Text style={styles.title}>Comments</Text>
          {Object.values(post.comments).map((comment) => (
            <View key={comment.id} style={styles.commentContainer}>
              <View style={styles.commentNameAndDate}>
                <Text style={styles.commentAuthor}>{comment.display_name}</Text>
                <Text style={styles.date}>
                  {formatDate(comment.created_at)}
                </Text>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </GenericWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  cardContainer: {
    padding: 15,
    gap: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postContent: {
    backgroundColor: "#FFE4E4",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 14,
    color: "#343434",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  assessmentContainer: {
    position: "relative",
    backgroundColor: "#E6F4FC",
  },
  markdown: {
    fontSize: 14,
    color: "#555",
  },
  expandButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 70,
  },
  gradient: {
    position: "absolute",
    borderRadius: 15,
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  expandText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  commentsContainer: {
    gap: 15,
    paddingVertical: 10,
    backgroundColor: "#EAE6FC",
  },
  commentNameAndDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  commentContainer: {
    borderRadius: 5,
  },
  commentAuthor: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
});
