import { Drawer } from "expo-router/drawer";
import DrawerContent from "../components/DrawerContent";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="(todo)"
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="(todo)" />
        <Drawer.Screen name="(tobuy)" />
        {/* <Drawer.Screen name="index" redirect /> */}
      </Drawer>
    </PaperProvider>
  );
}
