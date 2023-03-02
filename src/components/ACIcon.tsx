import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import Feather from "@expo/vector-icons/Feather";

import { colors } from "../constants/colors";

const sizes = {
  xxs: scale(8),
  xs: scale(12),
  s: scale(16),
  sm: scale(20),
  m: scale(24),
  ml: scale(28),
  l: scale(32),
  xl: scale(36),
  xxl: scale(40),
};

interface Props {
  name: React.ComponentProps<typeof Feather>["name"];
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
  specificSize?: number;
}

export const ACIcon = ({ name, specificSize, color = "primary", size = "ml" }: Props) => {
  return (
    <View>
      <Feather name={name} color={colors[color]} size={specificSize ? specificSize : sizes[size]} />
    </View>
  );
};
