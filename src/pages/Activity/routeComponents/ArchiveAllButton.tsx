import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { ACIcon, ACText } from "../../../components";
import { colors } from "../../../constants/colors";

export function ArchiveAllButton() {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <View style={styles.iconWrapper}>
        <ACIcon name="archive" color="textLight" specificSize={20} />
      </View>
      <ACText type="medium" color="textLight" size={13}>
        Archive all calls
      </ACText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    paddingVertical: 18,
    backgroundColor: colors.snowWhite,
    borderWidth: 1,
    borderColor: colors.borders,
    borderTopWidth: 0,
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
  iconWrapper: {
    paddingRight: 16,
  },
});
