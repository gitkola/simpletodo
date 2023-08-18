import useTodoStore from "@/src/zustand/todoStore";
import ScreenList, { Item } from "@/src/screens/ScreenList";

export default function TodoScreen() {
  const {
    setDoneHidden,
    setColorFilter,
    doneHidden,
    colorFilter,
    todos,
    remove,
    toggle,
    updateColor,
    setList,
  } = useTodoStore();

  return (
    <ScreenList
      doneHidden={doneHidden}
      colorFilter={colorFilter}
      setDoneHidden={setDoneHidden}
      setColorFilter={setColorFilter}
      headerTitle="ToDo"
      list={todos}
      addToListRoute="/(todo)/addTodo"
      editListItemRoute="/(todo)/editTodo"
      remove={remove}
      toggle={toggle}
      updateColor={updateColor}
      setList={setList as (list: Item[]) => void}
    />
  );
}
