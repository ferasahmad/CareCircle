import { useState } from "react";

export const useHugPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userHasHugged, setUserHasHugged] = useState<{
    [postId: number]: boolean;
  }>({});

  const toggleHugPost = async (postId: number, currentNumHugs: number) => {
    setIsLoading(true);
    setError(null);

    const hasHugged = userHasHugged[postId] ?? false;

    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num_hugs: hasHugged ? currentNumHugs - 1 : currentNumHugs + 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update hug count.");
      }

      const updatedPost = await response.json();
      setUserHasHugged((prev) => ({
        ...prev,
        [postId]: !hasHugged,
      }));

      return updatedPost;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { toggleHugPost, isLoading, error };
};
