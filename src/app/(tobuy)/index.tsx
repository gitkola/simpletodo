import useTobuyStore from "@/src/zustand/tobuyStore";
import ScreenList from "@/src/screens/ScreenList";

export default function Tobuy() {
  const { setDoneHidden, setColorFilter, doneHidden, colorFilter, tobuys } =
    useTobuyStore();

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
    />
  );
}
