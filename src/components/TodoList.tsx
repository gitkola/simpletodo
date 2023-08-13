import useTodoStore from "@/src/zustand/todoStore";
import TodoItem from "./TodoItem";
import { Divider, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

export default function TodoList() {
  const { todos, doneHidden } = useTodoStore();
  const theme = useTheme();
  return (
    <FlatList
      data={!doneHidden ? todos : todos.filter((item) => !item.done)}
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
