import { useState, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Pressable, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { ACIcon, ACText, Spacer } from "../../../components";
import { VerticalDots } from "../../../components/compoundComponents/VerticalDots";
import { CallDTO } from "../../../dtos/CallDTO";
import { colors } from "../../../constants/colors";
import { ArchiveButton } from "./ArchiveButton";
import api from "../../../services/api";

interface Props {
  item: CallDTO;
  typeOfCallInfo: ItemProps;
  date: string;
  time: string;
  onFinishArchiveAction: (id: string) => void;
}

export interface ItemProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  color: keyof typeof colors;
  text: string;
}

export function ActivityItem({ item, typeOfCallInfo, date, time, onFinishArchiveAction }: Props) {
  const { color, icon, text } = typeOfCallInfo;
  const animatedController = useRef(new Animated.Value(0)).current;

  const [bodySectionHeight, setBodySectionHeight] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  function toggleListItem() {
    if (isOpened) {
      Animated.timing(animatedController, {
        duration: 500,
        toValue: 0,
        useNativeDriver: false,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 500,
        toValue: 1,
        useNativeDriver: false,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    }
    setIsOpened(!isOpened);
  }

  function handleArchiveAction() {
    setIsLoading(true);
    api
      .patch(`/activities/${item.id}`, {
        is_archived: !item.is_archived,
      })
      .then(() => {
        onFinishArchiveAction(item.id);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert("Oops", "There was an error while doing the action. Please try again");
      });
  }

  return (
    <Pressable style={styles.container} onPress={toggleListItem}>
      <>
        <View style={styles.dateContainer}>
          <View style={styles.dottedLine} />
          <ACText>{date}</ACText>
          <View style={styles.dottedLine} />
        </View>

        <View style={styles.activityContainer}>
          <View style={styles.activityRow}>
            <View style={styles.leftWrapper}>
              <View style={styles.leftIcon}>
                <ACIcon name={icon} color={color} size="s" />
              </View>

              <View>
                <ACText type="medium">{item.via}</ACText>
                <Spacer size="xxs" />
                <ACText type="regular" color="textLight">
                  {text} {item.to}
                </ACText>
              </View>
            </View>

            <View style={styles.rightWrapper}>
              <VerticalDots />

              <View style={styles.actionButtonContainer}>
                <View style={styles.buttonWrapper}>
                  <ACIcon
                    name={isOpened ? "arrow-up-circle" : "arrow-down-circle"}
                    color={"textLight"}
                    specificSize={14}
                  />
                </View>

                <ACText type={"regular"} size={14}>
                  Details
                </ACText>
              </View>
            </View>
          </View>
          <Animated.View style={[styles.bodyBackground, { height: bodyHeight }]}>
            <View
              style={styles.bodyContainer}
              onLayout={(event) => setBodySectionHeight(event.nativeEvent.layout.height)}
            >
              <>
                <Spacer size="s" />
                <ACText type="medium" color="text">
                  Date:{" "}
                  <ACText type="regular" color="text">
                    {date} at {time}
                  </ACText>
                </ACText>

                <Spacer size="xxs" />

                {!!item.direction && (
                  <>
                    <ACText type="medium" color="text">
                      This was:{" "}
                      <ACText type="regular" color="text">
                        {item.direction === "inbound" ? "Inbound" : "Outbound"} call
                      </ACText>
                    </ACText>
                    <Spacer size="xxs" />
                  </>
                )}

                {!!item.from && (
                  <>
                    <ACText type="medium" color="text">
                      From:{" "}
                      <ACText type="regular" color="text">
                        {item.from}
                      </ACText>
                    </ACText>
                    <Spacer size="xxs" />
                  </>
                )}

                {!!item.to && (
                  <>
                    <ACText type="medium" color="text">
                      To:{" "}
                      <ACText type="regular" color="text">
                        {item.to}
                      </ACText>
                    </ACText>
                    <Spacer size="xxs" />
                  </>
                )}

                {!!item.via && (
                  <>
                    <ACText type="medium" color="text">
                      Aircall number used:{" "}
                      <ACText type="regular" color="text">
                        {item.via}
                      </ACText>
                    </ACText>
                    <Spacer size="xxs" />
                  </>
                )}

                <ArchiveButton
                  isArchived={item.is_archived}
                  onPress={handleArchiveAction}
                  loading={isLoading}
                />
              </>
            </View>
          </Animated.View>
        </View>
      </>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  activityContainer: {
    marginHorizontal: 24,

    backgroundColor: colors.snowWhite,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 10,
    marginVertical: 12,

    borderWidth: 1,
    borderColor: colors.borders,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: 12,
  },
  rightWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "25%",
  },
  actionButtonContainer: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonWrapper: {
    paddingRight: 6,
  },
  dottedLine: {
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: colors.borders,
    borderRadius: 1,
    borderDashOffset: 0,
    borderDashPattern: [5, 5],
    width: "40%",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  bodyBackground: {
    overflow: "hidden",
  },
  bodyContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
