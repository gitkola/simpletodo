import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Tabs } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { FontAwesome5 } from "@expo/vector-icons";
registerTranslation("en-GB", enGB);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "todo",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: theme.colors.primary,
            }}
          >
            <Tabs.Screen
              name="(tobuy)"
              options={{
                headerShown: false,
                tabBarLabel: "ToBuy",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5
                    name="shopping-cart"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="(todo)"
              options={{
                headerShown: false,
                tabBarLabel: "ToDo",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome5 name="list" size={size} color={color} />
                ),
              }}
            />
          </Tabs>
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
