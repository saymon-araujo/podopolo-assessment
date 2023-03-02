import { StyleSheet, View } from "react-native";

import { ACIcon, ACText, Spacer } from "../components";
import { colors } from "../constants/colors";

export default function Test() {
  return (
    <View style={styles.container}>
      <ACText>Texto Base</ACText>
      <Spacer size="m" />
      <ACIcon name="phone" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
