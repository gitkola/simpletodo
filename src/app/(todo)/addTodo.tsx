import DismissKeyboardWithAvoidingView from "@/src/hocs/DismissKeyboardWithAvoidingView";
import useTodoStore from "@/src/zustand/todoStore";
import { HStack, VStack } from "@react-native-material/core";
import { router } from "expo-router";
import { Appbar, Button, Text, TextInput, useTheme } from "react-native-paper";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";
import React, { useState } from "react";
import { View } from "react-native";
import formatTime from "@/src/utils/formatTime";

const ModalAddTodo = () => {
  const {
    newTodoTitle,
    newTodoDescription,
    newTodoDate,
    newTodoTime,
    setNewTodoTitle,
    setNewTodoDescription,
    setNewTodoDate,
    setNewTodoTime,
    addTodo,
  } = useTodoStore();

  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);

  const now = new Date(Date.now());

  return (
    <DismissKeyboardWithAvoidingView>
      <View style={{ flex: 1 }}>
        <Appbar
          mode="center-aligned"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Appbar.Content title="Add todo" color={theme.colors.onPrimary} />
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
              onChangeText={(text) => setNewTodoTitle(text)}
              value={newTodoTitle}
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
              onChangeText={(text) => setNewTodoDescription(text)}
              value={newTodoDescription}
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
                setNewTodoDate(text);
              }}
              value={new Date(newTodoDate || Date.now())}
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.background,
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
              }}
            >
              {formatTime(newTodoTime?.hours)}:
              {formatTime(newTodoTime?.minutes)}
            </Text>
            <TimePickerModal
              visible={visible}
              onDismiss={() => setVisible(false)}
              onConfirm={({ hours, minutes }) => {
                setNewTodoTime({ hours, minutes });
                setVisible(false);
              }}
              hours={now.getHours()}
              minutes={now.getMinutes()}
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
                addTodo();
                router.back();
              }}
              style={{ width: 100 }}
            >
              Add
            </Button>
          </HStack>
        </VStack>
      </View>
    </DismissKeyboardWithAvoidingView>
  );
};

export default ModalAddTodo;
