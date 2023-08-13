import useTodoStore from "@/src/zustand/todoStore";
import TodoItem from "./TodoItem";
import { Divider, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

export default function TodoList() {
  const { todos, doneHidden, colorFilter } = useTodoStore();
  const theme = useTheme();
  const doneFiltered = doneHidden ? todos.filter((item) => !item.done) : todos;
  const colorAndDoneFiltered =
    colorFilter !== "transparent"
      ? doneFiltered.filter((item) => item.color === colorFilter)
      : doneFiltered;
  return (
    <FlatList
      data={colorAndDoneFiltered}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item, index }) => <TodoItem todo={item} index={index} />}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      ItemSeparatorComponent={() => <Divider />}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    />
  );
}
