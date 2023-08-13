import { Stack } from 'expo-router';

export default function TodoStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="addTodo"
        options={{
          headerShown: false,
          animation: 'default',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="editTodo"
        options={{
          headerShown: false,
          animation: 'default',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
