import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Alert, FlatList } from "react-native";

import { ACIcon, ACText, MainHeader } from "../../components";
import { colors } from "../../constants/colors";
import api from "../../services/api";
import { CallDTO } from "../../dtos/CallDTO";

export type ViewOptions = "inbox" | "archived";

export default function CallsActivityScreen() {
  const [inboxActivities, setInboxActivities] = useState<CallDTO[]>();
  const [archivedActivities, setArchivedActivities] = useState<CallDTO[]>();

  const [currentView, setCurrentView] = useState<ViewOptions>("inbox");

  function fetchUserActivities() {
    api
      .get("/activities")
      .then(({ data }: { data: CallDTO[] }) => {
        const archived = data.filter((call) => call.is_archived);
        const nonArchived = data.filter((call) => !call.is_archived);

        setInboxActivities(nonArchived);
        setArchivedActivities(archived);

        console.log(nonArchived);
      })
      .catch((error) => {
        Alert.alert("Oops!", error.message);
      });
  }

  const renderActivities = useCallback(
    ({ item }: { item: CallDTO }) => (
      <View style={styles.activityContainer}>
        <ACIcon name="phone-incoming" size="s" />
        <ACText>{item.id}</ACText>
      </View>
    ),
    [inboxActivities]
  );

  useEffect(() => {
    fetchUserActivities();
  }, []);

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
            data={inboxActivities}
            renderItem={renderActivities}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 24,
  },
  activityContainer: {
    backgroundColor: colors.snowWhite,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 10,
    marginVertical: 8,

    borderWidth: 1,
    borderColor: colors.borders,
  },
});
