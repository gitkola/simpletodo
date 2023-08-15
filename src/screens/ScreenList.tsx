import { VStack } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Appbar, FAB, useTheme, Menu } from "react-native-paper";
import { router } from "expo-router";
import { StatusBar } from "react-native";
import { Todo } from "@/src/zustand/todoStore";
import { useState } from "react";
import ColorCircle from "@/src/components/ColorCircle";
import ColorCircleContainer from "@/src/components/ColorCircleContainer";
import colors from "@/src/utils/colors";
import { Tobuy } from "@/src/zustand/tobuyStore";
import List from "../components/List";

type ScreenListProps = {
  setDoneHidden: (doneHidden: boolean) => void;
  setColorFilter: (colorFilter: string) => void;
  doneHidden: boolean;
  colorFilter: string;
  headerTitle: string;
  list: Todo[] | Tobuy[];
  addToListRoute: string;
  editListItemRoute: string;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  updateColor: (id: number, color: string) => void;
};

export default function ScreenList({
  setDoneHidden,
  setColorFilter,
  doneHidden,
  colorFilter,
  headerTitle,
  list,
  addToListRoute,
  editListItemRoute,
  remove,
  toggle,
  updateColor,
}: ScreenListProps) {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();

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
        <Appbar.Action icon={{}} />
        <Appbar.Action icon={{}} />
        <Appbar.Content
          title={`${headerTitle} (${list.length})`}
          color={theme.colors.onPrimary}
        />
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
      <List
        list={list}
        doneHidden={doneHidden}
        colorFilter={colorFilter}
        editListItemRoute={editListItemRoute}
        remove={remove}
        toggle={toggle}
        updateColor={updateColor}
      />
      <FAB
        icon={"plus"}
        color={theme.colors.onPrimary}
        onPress={() => router.push(addToListRoute)}
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
