import { Drawer } from "expo-router/drawer";
import DrawerContent from "../components/DrawerContent";

export default function RootLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="(todo)"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="(todo)" />
      <Drawer.Screen name="(tobuy)" />
      <Drawer.Screen name="index" redirect />
    </Drawer>
  );
}
