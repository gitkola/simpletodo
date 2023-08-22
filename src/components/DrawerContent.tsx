import { router } from "expo-router";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

export default function DrawerContent(props: DrawerContentComponentProps) {
  const theme = useTheme();
  console.log(JSON.stringify(props.state, null, 2));

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: theme.colors.background }}
    >
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome5 name="list" size={size} color={color} />
        )}
        activeTintColor={theme.colors.primary}
        activeBackgroundColor={theme.colors.primaryContainer}
        inactiveTintColor={theme.colors.secondary}
        label={"ToDo"}
        onPress={() => router.push("/(todo)")}
        focused={props.state.routeNames[props.state.index] === "(todo)"}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome5 name="shopping-cart" size={size} color={color} />
        )}
        activeTintColor={theme.colors.primary}
        activeBackgroundColor={theme.colors.primaryContainer}
        inactiveTintColor={theme.colors.secondary}
        label={"ToBuy"}
        onPress={() => router.push("/(tobuy)/tobuy")}
        focused={props.state.routeNames[props.state.index] === "(tobuy)"}
      />
    </DrawerContentScrollView>
  );
}
