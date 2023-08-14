import useTobuyStore from "@/src/zustand/tobuyStore";
import ScreenAddListItem from "@/src/screens/ScreenAddListItem";

const ModalAddTobuy = () => {
  const {
    newTobuyTitle,
    newTobuyDescription,
    setNewTobuyTitle,
    setNewTobuyDescription,
    addTobuy,
  } = useTobuyStore();

  return (
    <ScreenAddListItem
      newTitle={newTobuyTitle}
      newDescription={newTobuyDescription}
      setNewTitle={setNewTobuyTitle}
      setNewDescription={setNewTobuyDescription}
      addListItem={addTobuy}
      headerTitle="Add ToBuy"
    />
  );
};

export default ModalAddTobuy;
