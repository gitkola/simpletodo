import DismissKeyboardWithAvoidingView from "@/src/hocs/DismissKeyboardWithAvoidingView";
import useTodoStore, { Time } from "@/src/zustand/todoStore";
import { HStack, VStack } from "@react-native-material/core";
import { router, useLocalSearchParams } from "expo-router";
import { Appbar, Button, Text, TextInput, useTheme } from "react-native-paper";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";
import React, { useState } from "react";
import { View } from "react-native";
import formatTime from "@/src/utils/formatTime";

const ModalEditTodo = () => {
  const { updateTitle, updateDescription, updateDate, updateTime, todos } =
    useTodoStore();

  const theme = useTheme();

  const { id } = useLocalSearchParams();

  const todo = todos.filter((item) => item.id.toString() === id?.toString())[0];

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [date, setDate] = useState(todo.date);
  const [time, setTime] = useState(todo.time);

  const [visible, setVisible] = useState(false);

  return (
    <DismissKeyboardWithAvoidingView>
      <View style={{ flex: 1 }}>
        <Appbar
          mode="center-aligned"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Appbar.Content title="Edit todo" color={theme.colors.onPrimary} />
        </Appbar>
        <VStack
          pv={32}
          spacing={16}
          ph={16}
          fill
          style={{ backgroundColor: theme.colors.background }}
        >
          <HStack items="center">
            <TextInput
              label={"Title"}
              onChangeText={(text) => setTitle(text)}
              value={title as string}
              placeholder="Todo title"
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.background,
              }}
              autoFocus
            />
          </HStack>
          <HStack items="center">
            <TextInput
              label={"Description"}
              onChangeText={(text) => setDescription(text)}
              value={description as string}
              placeholder="Todo description"
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.background,
              }}
              multiline
            />
          </HStack>
          <HStack items="center">
            <DatePickerInput
              label={"Date"}
              onChange={(text) => {
                setDate(text);
              }}
              value={new Date(date || Date.now())}
              placeholder="Todo date"
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.background,
                color: theme.colors.onBackground,
              }}
              inputMode="end"
              locale="en-GB"
            />
          </HStack>
          <HStack items="center" spacing={8}>
            <Button
              onPress={() => setVisible(true)}
              uppercase={false}
              mode="contained-tonal"
            >
              Pick time
            </Button>
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.onBackground,
              }}
            >
              {formatTime(time?.hours)}:{formatTime(time?.minutes)}
            </Text>
            <TimePickerModal
              visible={visible}
              onDismiss={() => setVisible(false)}
              onConfirm={({ hours, minutes }) => {
                setTime({ hours, minutes });
                setVisible(false);
              }}
              hours={time?.hours}
              minutes={time?.minutes}
              use24HourClock
            />
          </HStack>
          <HStack spacing={16} justify="center">
            <Button
              mode="outlined"
              onPress={() => router.back()}
              style={{ width: 100 }}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                updateTitle(Number(id), title);
                updateDescription(Number(id), description);
                updateDate(Number(id), date);
                updateTime(Number(id), time);
                router.back();
              }}
              style={{ width: 100 }}
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </View>
    </DismissKeyboardWithAvoidingView>
  );
};

export default ModalEditTodo;
