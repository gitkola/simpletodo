import { Todo } from "@/src/zustand/todoStore";
import { Divider, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Tobuy } from "../zustand/tobuyStore";
import ListItem from "./ListItem";

type ListProps = {
  list: Todo[] | Tobuy[];
  doneHidden: boolean;
  colorFilter: string;
  editListItemRoute: string;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  updateColor: (id: number, color: string) => void;
};

export default function List({
  list,
  doneHidden,
  colorFilter,
  editListItemRoute,
  remove,
  toggle,
  updateColor,
}: ListProps) {
  const theme = useTheme();
  const doneFiltered = doneHidden ? list.filter((item) => !item.done) : list;
  const colorAndDoneFiltered =
    colorFilter !== "transparent"
      ? doneFiltered.filter((item) => item.color === colorFilter)
      : doneFiltered;
  return (
    <FlatList
      data={colorAndDoneFiltered}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item, index }) => (
        <ListItem
          listItem={item}
          index={index}
          editListItemRoute={editListItemRoute}
          remove={remove}
          toggle={toggle}
          updateColor={updateColor}
          list={list}
        />
      )}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      ItemSeparatorComponent={() => <Divider />}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    />
  );
}
