import React from "react";
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
  return (
    <>
      {Object.values(comments).map((comment) => (
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
      ))}
    </>
  );
};

export default CommentsList;
