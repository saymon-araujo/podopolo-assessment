import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Alert, FlatList } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { format } from "date-fns";

import { ACIcon, ACText, MainHeader, Spacer } from "../../components";
import { CallDTO, CallTypeOptions } from "../../dtos/CallDTO";
import { VerticalDots } from "../../components/compoundComponents/VerticalDots";
import { screen } from "../../constants/screen";
import { colors } from "../../constants/colors";
import api from "../../services/api";

export type ViewOptions = "inbox" | "archived";

interface ItemProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  color: keyof typeof colors;
  text: string;
}

export default function CallsActivityScreen() {
  const [activities, setActivities] = useState<CallDTO[]>();
  const [currentView, setCurrentView] = useState<ViewOptions>("inbox");

  function fetchUserActivities() {
    api
      .get("/activities")
      .then(({ data }: { data: CallDTO[] }) => {
        const archived = data.filter((call) => !!call.from && !!call.to);

        setActivities(archived);
      })
      .catch((error) => {
        Alert.alert("Oops!", error.message);
      });
  }

  function handleSelectItemInfo(call_type?: CallTypeOptions): ItemProps {
    switch (call_type) {
      case "answered":
        return { icon: "phone-forwarded", color: "secondary", text: "Call with" };
      case "missed":
        return { icon: "phone-incoming", color: "primary", text: "Missed from" };
      case "voicemail":
        return { icon: "voicemail", color: "electricBlue", text: "Voicemail from" };
      default:
        return { icon: "phone", color: "textLight", text: "Call to" };
    }
  }

  function handleFormatDate(dateString: string) {
    const date = new Date(dateString);
    const formattedDate = format(date, "MMMM, d yyyy");

    return formattedDate;
  }

  const renderActivities = useCallback(
    ({ item }: { item: CallDTO }) => {
      const { color, icon, text } = handleSelectItemInfo(item.call_type);
      const date = handleFormatDate(item.created_at);

      return (
        <>
          <View style={styles.dateContainer}>
            <View style={styles.dottedLine} />
            <ACText>{date}</ACText>
            <View style={styles.dottedLine} />
          </View>

          <View style={styles.activityContainer}>
            <View style={styles.leftWrapper}>
              <View style={styles.leftIcon}>
                <ACIcon name={icon} color={color} size="s" />
              </View>

              <View>
                <ACText type="medium">{item.from}</ACText>
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
                  <ACIcon name="arrow-down-circle" color={"textLight"} specificSize={14} />
                </View>

                <ACText type={"regular"} size={14}>
                  Details
                </ACText>
              </View>
            </View>
          </View>
        </>
      );
    },
    [activities]
  );

  useEffect(() => {
    fetchUserActivities();
  }, [currentView]);

  return (
    <View style={styles.container}>
      <MainHeader
        title="Activity"
        currentView={currentView}
        onChangeView={(viewToShow) => {
          setCurrentView(viewToShow);
        }}
      />

      <View style={styles.content}>
        {currentView === "inbox" && (
          <FlatList
            data={activities}
            renderItem={renderActivities}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  activityContainer: {
    marginHorizontal: 24,

    backgroundColor: colors.snowWhite,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 10,
    marginVertical: 12,

    borderWidth: 1,
    borderColor: colors.borders,

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
  list: {
    marginTop: 16,
    paddingBottom: screen.statusBarHeight + 16,
  },
});
