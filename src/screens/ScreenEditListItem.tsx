import DismissKeyboardWithAvoidingView from "@/src/hocs/DismissKeyboardWithAvoidingView";
import { Time, Todo } from "@/src/zustand/todoStore";
import { HStack, VStack } from "@react-native-material/core";
import { router, useLocalSearchParams } from "expo-router";
import { Appbar, Button, Text, TextInput, useTheme } from "react-native-paper";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";
import React, { useState } from "react";
import { View } from "react-native";
import formatTime from "@/src/utils/formatTime";
import { Tobuy } from "../zustand/tobuyStore";

type ScreenEditListItemProps = {
  updateTitle: (id: number, title: string) => void;
  updateDescription: (id: number, description: string) => void;
  updateDate?: (id: number, date: Date | undefined) => void;
  updateTime?: (id: number, time: Time) => void;
  list: Todo[] | Tobuy[];
  headerTitle: string;
};

const ScreenEditListItem = ({
  updateTitle,
  updateDescription,
  updateDate,
  updateTime,
  list,
  headerTitle,
}: ScreenEditListItemProps) => {
  const theme = useTheme();

  const { id } = useLocalSearchParams();

  const listItem = list.filter(
    (item) => item.id.toString() === id?.toString()
  )[0];

  const [title, setTitle] = useState(listItem.title);
  const [description, setDescription] = useState(listItem.description);
  const [date, setDate] = useState("date" in listItem && listItem.date);
  const [time, setTime] = useState("time" in listItem && listItem.time);

  const [visible, setVisible] = useState(false);

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
              onChangeText={(text) => setTitle(text)}
              value={title as string}
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
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.background,
              }}
              multiline
            />
          </HStack>
          {("date" in listItem && typeof date === "object") ||
            (typeof date === "undefined" && (
              <HStack items="center">
                <DatePickerInput
                  label={"Date"}
                  onChange={(value) => {
                    setDate(value);
                  }}
                  value={new Date(date || Date.now())}
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
            ))}
          {"time" in listItem &&
            typeof time === "object" &&
            time !== null &&
            "hours" in time &&
            typeof time.hours === "number" &&
            "minutes" in time &&
            typeof time.minutes === "number" && (
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
                updateTitle(Number(id), title);
                updateDescription(Number(id), description);
                updateDate && updateDate(Number(id), date as Date | undefined);
                updateTime && updateTime(Number(id), time as Time);
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

export default ScreenEditListItem;
