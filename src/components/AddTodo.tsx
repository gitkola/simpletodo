import useTodoStore from '@/src/zustand/todoStore';
import { HStack } from '@react-native-material/core';
import { IconButton } from 'react-native-paper';
import { TextInput } from 'react-native';

export default function AddTodo() {
  const { newTodoTitle, setNewTodoTitle, addTodo } = useTodoStore();
  return (
    <HStack
      pl={20}
      spacing={8}
      items="center"
      style={{ backgroundColor: 'white' }}>
      <TextInput
        onChangeText={(e) => setNewTodoTitle(e)}
        value={newTodoTitle}
        placeholder="Todo text"
        placeholderTextColor={'#aaa'}
        style={{
          flex: 1,
          height: 60,
          fontSize: 18,
        }}
      />
      <IconButton icon="plus" onPress={addTodo} size={32} />
    </HStack>
  );
}
