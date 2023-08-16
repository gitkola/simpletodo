import { VStack } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Appbar, FAB, useTheme, Menu } from "react-native-paper";
import { router } from "expo-router";
import { StatusBar } from "react-native";
import { Todo } from "@/src/zustand/todoStore";
import { Tobuy } from "@/src/zustand/tobuyStore";
import { useState } from "react";
import ColorCircle from "@/src/components/ColorCircle";
import ColorCircleContainer from "@/src/components/ColorCircleContainer";
import colors from "@/src/utils/colors";
import List from "../components/List";
import { Share } from "react-native";
import formatTime from "../utils/formatTime";

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

const generateShareMessage = (headerTitle: string, list: Todo[] | Tobuy[]) =>
  `${headerTitle} (${list.length})\n${list
    .map((item) => {
      if ("date" in item) {
        return (
          (item.done ? "\u2611" : "\u2610") +
          " " +
          item.title +
          " " +
          item.description +
          " " +
          new Date(item?.date as unknown as string).toLocaleDateString() +
          "  " +
          formatTime(item.time?.hours) +
          ":" +
          formatTime(item.time?.minutes) +
          "\n"
        );
      } else {
        return (
          (item.done ? "\u2611" : "\u2610") +
          " " +
          item.title +
          " " +
          item.description +
          "\n"
        );
      }
    })
    .join("")}`;

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

  const doneFiltered = doneHidden ? list.filter((item) => !item.done) : list;
  const colorAndDoneFiltered =
    colorFilter !== "transparent"
      ? doneFiltered.filter((item) => item.color === colorFilter)
      : doneFiltered;

  return (
    <VStack fill>
      <StatusBar barStyle={"light-content"} />
      <Appbar
        elevated
        mode="center-aligned"
        safeAreaInsets={{ top }}
        style={{ height: 100, backgroundColor: theme.colors.primary }}
      >
        <Appbar.Action
          icon={!doneHidden ? "filter-outline" : "filter-off-outline"}
          iconColor={theme.colors.onPrimary}
          onPress={() => setDoneHidden(!doneHidden)}
        />
        <Appbar.Action icon={{}} />
        <Appbar.Content
          title={`${headerTitle} (${list.length})`}
          color={theme.colors.onPrimary}
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
        <Appbar.Action
          icon={"share-outline"}
          iconColor={theme.colors.onPrimary}
          onPress={() => {
            const message = generateShareMessage(
              headerTitle,
              colorAndDoneFiltered
            );
            Share.share({
              title: `${headerTitle} (${colorAndDoneFiltered.length})`,
              message,
            });
          }}
        />
      </Appbar>
      <List
        list={colorAndDoneFiltered}
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
