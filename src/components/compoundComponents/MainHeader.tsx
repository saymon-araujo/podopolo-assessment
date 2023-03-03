import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "../../constants/colors";
import { screen } from "../../constants/screen";
import { ACText, ACIcon } from "../index";
import { ViewOptions } from "../../pages/Activity/CallsActivityScreen";
import { VerticalDots } from "./VerticalDots";

interface Props {
  title: string;
  currentView: ViewOptions;
  onChangeView: (viewToShow: ViewOptions) => void;
}

export function MainHeader({ title, currentView, onChangeView }: Props) {
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
        <TouchableOpacity
          onPress={() => {
            onChangeView("inbox");
          }}
          style={[
            styles.actionButtonContainer,
            currentView === "inbox" && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 3,
              marginBottom: -3,
            },
          ]}
        >
          <View style={styles.buttonWrapper}>
            <ACIcon
              name="inbox"
              color={currentView === "inbox" ? "text" : "textLight"}
              specificSize={14}
            />
          </View>

          <ACText type={currentView === "inbox" ? "medium" : "regular"} size={14}>
            Inbox
          </ACText>
        </TouchableOpacity>

        <VerticalDots />

        <TouchableOpacity
          onPress={() => {
            onChangeView("archived");
          }}
          style={[
            styles.actionButtonContainer,
            currentView === "archived" && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 3,
              marginBottom: -3,
            },
          ]}
        >
          <View style={styles.buttonWrapper}>
            <ACIcon
              name="archive"
              color={currentView === "archived" ? "text" : "textLight"}
              specificSize={14}
            />
          </View>

          <ACText type={currentView === "archived" ? "medium" : "regular"} size={14}>
            Archived
          </ACText>
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
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    height: "100%",
    alignSelf: "flex-end",
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
});
