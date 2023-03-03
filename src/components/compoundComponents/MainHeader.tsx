import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "../../constants/colors";
import { screen } from "../../constants/screen";
import { ACText, ACIcon } from "../index";
import { VerticalDots } from "./VerticalDots";

interface Props {
  title: string;
}

export function MainHeader({ title }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerTitleWrapper}>
        <View style={styles.iconContainer}>
          <ACIcon name="phone" specificSize={18} color="secondary" />
        </View>

        <ACText type="medium" size={20}>
          {title}
        </ACText>
      </View>

      <View style={styles.headerActionsContainer}>
        <TouchableOpacity style={styles.inboxActiveContainer}>
          <ACText type="medium" size={14}>
            Inbox
          </ACText>
        </TouchableOpacity>

        <VerticalDots />

        <TouchableOpacity>
          <ACText type="regular" size={14}>
            All calls
          </ACText>
        </TouchableOpacity>

        <VerticalDots />
        <TouchableOpacity>
          <ACIcon name="sliders" color="textLight" size="sm" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: screen.statusBarHeight,
    backgroundColor: colors.snowWhite,
    borderBottomWidth: 1,
    borderColor: colors.borders,
    flexDirection: "row",
    alignItems: "center",
    height: screen.height * 0.135,
  },
  iconContainer: {
    width: screen.width * 0.09,
    height: screen.width * 0.09,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: colors.secondary,
    marginRight: 10,
    backgroundColor: colors.snowWhite,
    borderWidth: 2,
  },
  headerTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.snowWhite,
    paddingRight: 28,
    paddingLeft: 16,
    height: "100%",
  },
  headerActionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: "100%",
  },
  inboxActiveContainer: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 3,
    marginBottom: -3,
    height: "100%",
    justifyContent: "center",
  },
});
