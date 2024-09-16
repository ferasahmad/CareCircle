import GenericWrapper from "@/components/GenericWrapper";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Post from "@/components/Post";
import { Text } from "react-native";

export default function Index() {
  const { posts, loading, error } = useFetchPosts();

  if (loading) {
    return (
      <GenericWrapper>
        <ActivityIndicator size="large" color="#0000ff" />
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
        keyExtractor={(item: Post) => item.post_url}
        renderItem={({ item }: { item: Post }) => <Post post={item} />}
      />
    </GenericWrapper>
  );
}

const styles = StyleSheet.create({
  flatlistContainer: {
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
