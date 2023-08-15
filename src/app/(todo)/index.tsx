import useTodoStore from "@/src/zustand/todoStore";
import ScreenList from "@/src/screens/ScreenList";

export default function Todo() {
  const {
    setDoneHidden,
    setColorFilter,
    doneHidden,
    colorFilter,
    todos,
    remove,
    toggle,
    updateColor,
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
    />
  );
}
