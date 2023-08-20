import { Stack } from "expo-router";

export default function TobuyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"tobuy"} />
      <Stack.Screen
        name={"addTobuy"}
        options={{
          animation: "default",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name={"editTobuy"}
        options={{
          animation: "default",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
