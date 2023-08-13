import TodoList from "@/src/components/TodoList";
import { VStack } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Appbar, FAB, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { StatusBar } from "react-native";

export default function Todo() {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <VStack fill>
      <StatusBar barStyle={"light-content"} />
      <Appbar
        elevated
        mode="center-aligned"
        safeAreaInsets={{ top }}
        style={{ height: 100, backgroundColor: theme.colors.primary }}
      >
        <Appbar.Content title="Todo" color={theme.colors.onPrimary} />
      </Appbar>
      <TodoList />
      <FAB
        icon={"plus"}
        color={theme.colors.onPrimary}
        onPress={() => router.push("/(todo)/addTodo")}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          borderRadius: 30,
          backgroundColor: theme.colors.primary,
        }}
      />
    </VStack>
  );
}
