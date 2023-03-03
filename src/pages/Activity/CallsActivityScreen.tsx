import { StyleSheet, View } from "react-native";

import { MainHeader } from "../../components";
import { ArchiveAllButton } from "./routeComponents/ArchiveAllButton";
import { colors } from "../../constants/colors";

export default function CallsActivityScreen() {
  return (
    <View style={styles.container}>
      <MainHeader title="Activity" />

      <View style={styles.content}>
        <ArchiveAllButton />
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
});
