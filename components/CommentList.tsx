import React from "react";
import { Text, StyleSheet } from "react-native";
import Comment from "./Comment";

interface CommentsListProps {
  comments: Record<number, Comment>;
  level?: number;
  expandedComments: Record<number, boolean>;
  toggleCollapse: (commentId: number) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  level = 0,
  expandedComments,
  toggleCollapse,
}) => {
  const hasComments = Object.keys(comments).length > 0;

  return (
    <>
      {!hasComments ? (
        <Text style={styles.noCommentsText}>No comments yet</Text>
      ) : (
        Object.values(comments).map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            level={level}
            isCollapsed={!expandedComments[comment.id]}
            toggleCollapse={toggleCollapse}
            renderReplies={() =>
              comment.replies ? (
                <CommentsList
                  comments={comment.replies}
                  level={level + 1}
                  expandedComments={expandedComments}
                  toggleCollapse={toggleCollapse}
                />
              ) : null
            }
          />
        ))
      )}
    </>
  );
};

const styles = StyleSheet.create({
  noCommentsText: {
    alignSelf: "center",
    color: "#343434",
  },
});

export default CommentsList;
