import { Dimensions } from "react-native";
import Constants from "expo-constants";

export const screen = {
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
  statusBarHeight: Constants.statusBarHeight,
};
