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
};

export default function List({
  list,
  doneHidden,
  colorFilter,
  editListItemRoute,
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
