import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Image } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PostsProvider } from "@/context/PostsContext";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PostsProvider>
      <RootLayoutNav />
    </PostsProvider>
  );
}

function RootLayoutNav() {
  const homeHeaderOptions = {
    title: "",
    headerLeft: () => (
      <Image
        source={require("../assets/images/care-circle-logo-with-text.png")}
        style={{ width: 150, height: 40, marginLeft: 10 }}
      />
    ),
    headerStyle: {
      backgroundColor: "#FEFAE1",
      borderBottomWidth: 0,
    },
  };

  const postDetailsOptions = {
    title: "",
    headerStyle: {
      backgroundColor: "#FEFAE1",
      borderBottomWidth: 0,
    },
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={homeHeaderOptions} />
      <Stack.Screen name="post-details" options={postDetailsOptions} />
    </Stack>
  );
}
