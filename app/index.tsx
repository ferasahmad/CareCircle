import GenericWrapper from "@/components/GenericWrapper";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import Post from "@/components/Post";
import { usePosts } from "@/context/PostsContext";

export default function Index() {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return (
      <GenericWrapper>
        <ActivityIndicator size="large" color="#CCD5AE" />
      </GenericWrapper>
    );
  }

  if (error) {
    return (
      <GenericWrapper>
        <Text>Error: {error}</Text>
      </GenericWrapper>
    );
  }

  return (
    <GenericWrapper>
      <FlatList
        data={posts}
        contentContainerStyle={styles.flatlistContainer}
        keyExtractor={(item) => item.post_url}
        renderItem={({ item }) => <Post post={item} />}
      />
    </GenericWrapper>
  );
}

const styles = StyleSheet.create({
  flatlistContainer: {
    gap: 15,
  },
});
