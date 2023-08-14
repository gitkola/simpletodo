import ScreenEditListItem from "@/src/screens/ScreenEditListItem";
import useTobuyStore from "@/src/zustand/tobuyStore";

const ModalEditTobuy = () => {
  const { updateTitle, updateDescription, tobuys } = useTobuyStore();

  return (
    <ScreenEditListItem
      updateTitle={updateTitle}
      updateDescription={updateDescription}
      list={tobuys}
      headerTitle="Edit"
    />
  );
};

export default ModalEditTobuy;
