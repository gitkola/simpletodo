import { HStack, IconButton } from "@react-native-material/core";
import useTodoStore, { Todo } from "@/src/zustand/todoStore";
import { FontAwesome5 } from "@expo/vector-icons";
import { Checkbox, Divider, Text, useTheme } from "react-native-paper";
import { View, Dimensions } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import formatTime from "@/src/utils/formatTime";
import ColorCircle from "./ColorCircle";
import colors from "../utils/colors";
import ColorCircleContainer from "./ColorCircleContainer";

export default function TodoItem({
  todo,
  index,
}: {
  todo: Todo;
  index: number;
}) {
  const { remove, toggle, updateColor, todos } = useTodoStore();
  const theme = useTheme();
  const itemHeight = 60;

  const height = useSharedValue<number>(60);
  const { width } = Dimensions.get("window");

  const deleteItem = () => {
    height.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(remove)(todo.id);
    });
  };

  const leftButtons = () => (
    <>
      {colors.map((color: string) => (
        <ColorCircleContainer
          children={
            <ColorCircle
              onPress={() => updateColor(todo.id, color)}
              color={color}
            />
          }
          w={35}
          h={60}
          key={color}
        />
      ))}
    </>
  );

  const rightButtons = () => (
    <View
      style={{
        width: itemHeight,
        height: itemHeight,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.error,
      }}
    >
      <IconButton
        icon={({ color, size }) => (
          <FontAwesome5 name="trash" size={size} color={color} />
        )}
        onPress={deleteItem}
        color={theme.colors.onError}
      />
    </View>
  );

  return (
    <Animated.View
      style={{
        height,
      }}
    >
      {index === 0 && <Divider />}
      <Swipeable
        renderRightActions={rightButtons}
        renderLeftActions={leftButtons}
      >
        <HStack
          items="center"
          style={{
            backgroundColor: theme.colors.surface,
            height: itemHeight,
          }}
        >
          <View
            style={{
              width: itemHeight,
              height: itemHeight,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Checkbox.Android
              status={todo.done ? "checked" : "unchecked"}
              onPress={() => toggle(todo.id)}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(todo)/editTodo",
                params: { id: todo.id },
              })
            }
            style={{
              width: width - itemHeight,
              height: itemHeight,
              justifyContent: "center",
            }}
          >
            <HStack items="center" justify="between" pr={18}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.colors.onSurface,
                  }}
                >
                  {todo.title}
                </Text>
                {todo.description && (
                  <Text
                    style={{
                      fontSize: 16,
                      color: theme.colors.onSurfaceDisabled,
                    }}
                  >
                    {todo.description}
                  </Text>
                )}
                <HStack spacing={8}>
                  {todo.date && (
                    <Text
                      style={{
                        color: theme.colors.onSurfaceDisabled,
                        fontSize: 12,
                      }}
                    >
                      {new Date(todo.date).toLocaleDateString()}
                    </Text>
                  )}
                  {todo.date && (
                    <Text
                      style={{
                        color: theme.colors.onSurfaceDisabled,
                        fontSize: 12,
                      }}
                    >
                      {formatTime(todo.time.hours)}:
                      {formatTime(todo.time.minutes)}
                    </Text>
                  )}
                </HStack>
              </View>
              <ColorCircle color={todo.color} />
            </HStack>
          </TouchableOpacity>
        </HStack>
      </Swipeable>
      {index === todos.length - 1 && <Divider />}
    </Animated.View>
  );
}
