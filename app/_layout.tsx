import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Image, Text } from "react-native";
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

const headerOptions = {
  title: "",
  headerLeft: () => (
    <Image
      source={require("../assets/images/care-circle-logo-with-text.png")}
      style={{ width: 150, height: 40, marginLeft: 10 }}
    />
  ),
  headerStyle: {
    backgroundColor: "#FEFAE1",
  },
};

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={headerOptions} />
        <Stack.Screen name="post-details" options={headerOptions} />
      </Stack>
    </ThemeProvider>
  );
}
