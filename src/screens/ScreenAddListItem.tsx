import DismissKeyboardWithAvoidingView from "@/src/hocs/DismissKeyboardWithAvoidingView";
import { Time } from "@/src/zustand/todoStore";
import { HStack, VStack } from "@react-native-material/core";
import { router } from "expo-router";
import { Appbar, Button, Text, TextInput, useTheme } from "react-native-paper";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";
import React, { useState } from "react";
import { View } from "react-native";
import formatTime from "@/src/utils/formatTime";

type ScreenAddListItemProps = {
  newTitle: string;
  newDescription: string;
  newDate?: Date | undefined;
  newTime?: Time;
  setNewTitle: (title: string) => void;
  setNewDescription: (description: string) => void;
  setNewDate?: (date: Date | undefined) => void;
  setNewTime?: (time: Time) => void;
  addListItem: () => void;
  headerTitle: string;
};

const ScreenAddListItem = ({
  newTitle,
  newDescription,
  newDate,
  newTime,
  setNewTitle,
  setNewDescription,
  setNewDate,
  setNewTime,
  addListItem,
  headerTitle,
}: ScreenAddListItemProps) => {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  const now = new Date(Date.now());

  return (
    <DismissKeyboardWithAvoidingView>
      <View style={{ flex: 1 }}>
        <Appbar
          mode="center-aligned"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Appbar.Content title={headerTitle} color={theme.colors.onPrimary} />
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
              onChangeText={(text) => setNewTitle(text)}
              value={newTitle}
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
              onChangeText={(text) => setNewDescription(text)}
              value={newDescription}
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.background,
              }}
              multiline
            />
          </HStack>
          {setNewDate && (
            <HStack items="center">
              <DatePickerInput
                label={"Date"}
                onChange={(value) => setNewDate(value)}
                value={new Date(newDate || Date.now())}
                style={{
                  flex: 1,
                  fontSize: 18,
                  backgroundColor: theme.colors.background,
                }}
                inputMode="end"
                locale="en-GB"
              />
            </HStack>
          )}
          {setNewTime && newTime && (
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
                {formatTime(newTime?.hours)}:{formatTime(newTime?.minutes)}
              </Text>
              <TimePickerModal
                visible={visible}
                onDismiss={() => setVisible(false)}
                onConfirm={({ hours, minutes }) => {
                  setNewTime({ hours, minutes });
                  setVisible(false);
                }}
                hours={now.getHours()}
                minutes={now.getMinutes()}
                use24HourClock
              />
            </HStack>
          )}
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
                addListItem();
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

export default ScreenAddListItem;
