import "expo-dev-client";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { FontAwesome5 } from "@expo/vector-icons";
import DrawerContent from "./components/DrawerContent";
import TodoScreen from "./app0/(todo)";
import ModalAddTodo from "./app0/(todo)/addTodo";
import ModalEditTodo from "./app0/(todo)/editTodo";
import TobuyScreen from "./app0/(tobuy)";
import ModalAddTobuy from "./app0/(tobuy)/addTobuy";
import ModalEditTobuy from "./app0/(tobuy)/editTobuy";

registerTranslation("en-GB", enGB);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: "todo",
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

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const TodoStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="todo"
      component={TodoScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="addTodo"
      component={ModalAddTodo}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="editTodo"
      component={ModalEditTodo}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const TobuyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="tobuy"
      component={TobuyScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="addTobuy"
      component={ModalAddTobuy}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="editTobuy"
      component={ModalEditTobuy}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

function RootLayoutNav() {
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: {
              width: 280,
            },
            headerShown: false,
          }}
          drawerContent={(props) => <DrawerContent {...props} />}
          initialRouteName="(todo)"
        >
          <Drawer.Screen
            name="(todo)"
            component={TodoStack}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="(tobuy)"
            component={TobuyStack}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </PaperProvider>
    </GestureHandlerRootView>
  );

  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <PaperProvider>
  //       <Drawer
  //         drawerContent={(props) => <DrawerContent {...props} />}
  //         screenOptions={{
  //           headerShown: false,
  //         }}
  //         initialRouteName="/(todo)"
  //       >
  //         {/* <Drawer.Screen name="(tobuy)" />
  //         <Drawer.Screen name="(todo)" /> */}
  //       </Drawer>
  //     </PaperProvider>
  //   </GestureHandlerRootView>
  // );

  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <PaperProvider>
  //       <Tabs
  //         screenOptions={{
  //           tabBarActiveTintColor: theme.colors.primary,
  //         }}
  //       >
  //         <Tabs.Screen
  //           name="(todo)"
  //           options={{
  //             headerShown: false,
  //             tabBarLabel: "ToDo",
  //             tabBarIcon: ({ color, size }) => (
  //               <FontAwesome5 name="list" size={size} color={color} />
  //             ),
  //           }}
  //         />
  //         <Tabs.Screen
  //           name="(tobuy)"
  //           options={{
  //             headerShown: false,
  //             tabBarLabel: "ToBuy",
  //             tabBarIcon: ({ color, size }) => (
  //               <FontAwesome5 name="shopping-cart" size={size} color={color} />
  //             ),
  //           }}
  //         />
  //       </Tabs>
  //     </PaperProvider>
  //   </GestureHandlerRootView>
  // );
}
