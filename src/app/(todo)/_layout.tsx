import { Stack } from "expo-router";

export default function TodoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"todo"} />
      <Stack.Screen
        name={"addTodo"}
        options={{
          animation: "default",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name={"editTodo"}
        options={{
          animation: "default",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
