import useTobuyStore from "@/src/zustand/tobuyStore";
import ScreenList from "@/src/screens/ScreenList";

export default function Tobuy() {
  const {
    setDoneHidden,
    setColorFilter,
    doneHidden,
    colorFilter,
    tobuys,
    remove,
    toggle,
    updateColor,
    setList,
  } = useTobuyStore();

  return (
    <ScreenList
      doneHidden={doneHidden}
      colorFilter={colorFilter}
      setDoneHidden={setDoneHidden}
      setColorFilter={setColorFilter}
      headerTitle="ToBuy"
      list={tobuys}
      addToListRoute="/(tobuy)/addTobuy"
      editListItemRoute="/(tobuy)/editTobuy"
      remove={remove}
      toggle={toggle}
      updateColor={updateColor}
      setList={setList}
    />
  );
}
