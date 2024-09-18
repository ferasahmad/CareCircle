import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import formatDate from "@/utilities/formatDate";

interface CommentProps {
  comment: Comment;
  level: number;
  toggleCollapse: (commentId: number) => void;
  isCollapsed: boolean;
  renderReplies: () => React.ReactNode;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  level,
  toggleCollapse,
  isCollapsed,
  renderReplies,
}) => {
  return (
    <View style={[styles.commentContainer, { paddingLeft: level * 20 }]}>
      <View style={styles.commentNameAndDate}>
        <Text style={styles.commentAuthor}>{comment.display_name}</Text>
        <Text style={styles.date}>{formatDate(comment.created_at)}</Text>
      </View>
      <Text style={styles.commentText}>{comment.text}</Text>
      {comment.replies && Object.keys(comment.replies).length > 0 && (
        <TouchableOpacity
          style={styles.repliesButton}
          onPress={() => toggleCollapse(comment.id)}
        >
          <View style={styles.line} />
          <Text style={styles.replyToggle}>
            {isCollapsed
              ? `View ${Object.keys(comment.replies).length} Replies`
              : `Hide Replies`}
          </Text>
          <View style={{ ...styles.line, flexGrow: 1 }} />
        </TouchableOpacity>
      )}
      {!isCollapsed && renderReplies()}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    borderLeftColor: "gray",
    gap: 10,
  },
  commentNameAndDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  commentAuthor: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  repliesButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  replyToggle: {
    color: "#555",
    alignSelf: "flex-start",
    borderRadius: 5,
    fontSize: 14,
    marginVertical: 5,
  },
  line: {
    height: 2,
    width: 40,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Comment;
