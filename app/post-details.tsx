import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { usePosts } from "@/context/PostsContext";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import GenericWrapper from "@/components/GenericWrapper";
import formatDate from "@/utilities/formatDate";
import PostAction from "@/components/PostAction";
import { useHugPost } from "@/hooks/useHugPost";
import CommentsList from "@/components/CommentList";
import ChatbotAssessment from "@/components/ChatbotAssesment";

export default function PostDetails() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { posts, loading, error } = usePosts();

  const [expandedComments, setExpandedComments] = useState<
    Record<number, boolean>
  >({});

  const post = posts.find((p) => p.id === postId);
  const [numHugs, setNumHugs] = useState(post ? post.num_hugs : 0);
  const [hasHugged, setHasHugged] = useState(false);

  const { toggleHugPost, error: hugError } = useHugPost();

  if (!post)
    return (
      <GenericWrapper>
        <Text>Post not found</Text>
      </GenericWrapper>
    );

  const handleHugPress = async () => {
    const updatedPost = await toggleHugPost(post.id, numHugs);
    if (!updatedPost) {
      Alert.alert("Error", hugError || "Failed to update hug.");
    } else {
      setNumHugs(updatedPost.num_hugs);
      setHasHugged(!hasHugged);
    }
  };

  const toggleCollapse = (commentId: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <GenericWrapper>
      <ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
        <View style={styles.cardContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.patient_description}</Text>
          <View>
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
                onPress={() => {}}
              />
            </View>
            <Text style={styles.date}>{formatDate(post.created_at)}</Text>
          </View>
        </View>
        <ChatbotAssessment assessment={post.assessment} />
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Comments</Text>
          <CommentsList
            comments={post.comments}
            expandedComments={expandedComments}
            toggleCollapse={toggleCollapse}
          />
        </View>
      </ScrollView>
    </GenericWrapper>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#FEFAE1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
