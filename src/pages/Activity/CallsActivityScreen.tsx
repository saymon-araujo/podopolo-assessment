import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Alert, FlatList } from "react-native";

import { MainHeader } from "../../components";
import { CallDTO } from "../../dtos/CallDTO";
import { screen } from "../../constants/screen";
import { colors } from "../../constants/colors";
import api from "../../services/api";
import { ActivityItem } from "./routeComponents/ActivityItem";
import { handleSelectItemInfo } from "../../utils/handleSelectItemInfo";
import { handleFormatDate, handleFormatDateTime } from "../../utils/handleFormatDate";

export type ViewOptions = "inbox" | "archived";

export default function CallsActivityScreen() {
  const [activities, setActivities] = useState<CallDTO[]>();
  const [currentView, setCurrentView] = useState<ViewOptions>("inbox");

  function fetchUserActivities() {
    api
      .get("/activities")
      .then(({ data }: { data: CallDTO[] }) => {
        setActivities(data);
      })
      .catch((error) => {
        Alert.alert("Oops!", error.message);
      });
  }

  const renderActivities = useCallback(
    ({ item }: { item: CallDTO }) => {
      const typeOfCallInfo = handleSelectItemInfo(item.call_type);
      const date = handleFormatDate(item.created_at);
      const time = handleFormatDateTime(item.created_at);

      return (
        <ActivityItem
          item={item}
          typeOfCallInfo={typeOfCallInfo}
          date={date}
          time={time}
          onFinishArchiveAction={handleCurrentArchiveValueOfItem}
        />
      );
    },
    [activities]
  );

  function handleCurrentArchiveValueOfItem(id: string) {
    if (activities) {
      const newState = activities.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            is_archived: !item.is_archived,
          };
        }
        return item;
      });
      setActivities(newState);
    }
  }

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
        {currentView === "inbox" ? (
          <FlatList
            data={activities?.filter((item) => item.is_archived === false)}
            renderItem={renderActivities}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            initialNumToRender={7}
          />
        ) : (
          <FlatList
            data={activities?.filter((item) => item.is_archived)}
            renderItem={renderActivities}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            initialNumToRender={7}
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
  list: {
    marginTop: 16,
    paddingBottom: screen.statusBarHeight + 16,
  },
});
