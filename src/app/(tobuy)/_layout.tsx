import { Stack } from "expo-router";

export default function TodoStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="addTobuy"
        options={{
          headerShown: false,
          animation: "default",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="editTobuy"
        options={{
          headerShown: false,
          animation: "default",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
