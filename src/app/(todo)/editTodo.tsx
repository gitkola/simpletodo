import ScreenEditListItem from "@/src/screens/ScreenEditListItem";
import useTodoStore from "@/src/zustand/todoStore";

const ModalEditTodo = () => {
  const { updateTitle, updateDescription, updateDate, updateTime, todos } =
    useTodoStore();

  return (
    <ScreenEditListItem
      updateTitle={updateTitle}
      updateDescription={updateDescription}
      updateDate={updateDate}
      updateTime={updateTime}
      list={todos}
      headerTitle="Edit"
    />
  );
};

export default ModalEditTodo;
