import React, { createContext, useContext } from "react";
import { useFetchPosts } from "@/hooks/useFetchPosts";

interface PostsContextProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => void;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { posts, loading, error, fetchPosts } = useFetchPosts();

  return (
    <PostsContext.Provider value={{ posts, loading, error, fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
