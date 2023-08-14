import useTodoStore from "@/src/zustand/todoStore";
import ScreenAddListItem from "@/src/screens/ScreenAddListItem";

const ModalAddTodo = () => {
  const {
    newTodoTitle,
    newTodoDescription,
    newTodoDate,
    newTodoTime,
    setNewTodoTitle,
    setNewTodoDescription,
    setNewTodoDate,
    setNewTodoTime,
    addTodo,
  } = useTodoStore();

  return (
    <ScreenAddListItem
      newTitle={newTodoTitle}
      newDescription={newTodoDescription}
      newDate={newTodoDate}
      newTime={newTodoTime}
      setNewTitle={setNewTodoTitle}
      setNewDescription={setNewTodoDescription}
      setNewDate={setNewTodoDate}
      setNewTime={setNewTodoTime}
      addListItem={addTodo}
      headerTitle="Add ToDo"
    />
  );
};

export default ModalAddTodo;
