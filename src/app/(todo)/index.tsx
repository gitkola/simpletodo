import TodoList from "@/src/components/TodoList";
import { VStack } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Appbar, FAB, useTheme, Menu } from "react-native-paper";
import { router } from "expo-router";
import { StatusBar } from "react-native";
import useTodoStore from "@/src/zustand/todoStore";
import { useState } from "react";
import ColorCircle from "@/src/components/ColorCircle";
import ColorCircleContainer from "@/src/components/ColorCircleContainer";
import colors from "@/src/utils/colors";

export default function Todo() {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();
  const { setDoneHidden, setColorFilter, doneHidden, colorFilter } =
    useTodoStore();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
        <Appbar.Action
          icon={!doneHidden ? "filter-outline" : "filter-off-outline"}
          iconColor={theme.colors.onPrimary}
          onPress={() => setDoneHidden(!doneHidden)}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon={() => <ColorCircle color={colorFilter} />}
              onPress={openMenu}
            />
          }
          anchorPosition="bottom"
          contentStyle={{ left: 2, bottom: 10 }}
        >
          {colors.map((color: string) => (
            <ColorCircleContainer
              children={
                <ColorCircle
                  onPress={() => {
                    setColorFilter(color);
                    closeMenu();
                  }}
                  color={color}
                />
              }
              key={color}
            />
          ))}
        </Menu>
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
