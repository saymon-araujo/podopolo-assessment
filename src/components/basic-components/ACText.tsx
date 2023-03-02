import React, { ReactNode } from "react";
import { Text, TextStyle } from "react-native";
import { scale } from "react-native-size-matters";

import { colors } from "../constants/colors";

interface Props {
  children: ReactNode;
  type?: TextTypeOptions;
  color?: keyof typeof colors;
  alignment?: TextStyle["textAlign"];
  size?: number;
}

type TextTypeOptions = "light" | "regular" | "medium" | "bold";

export function ACText({
  children,
  type = "regular",
  color = "text",
  alignment = "auto",
  size,
}: Props) {
  return (
    <Text
      allowFontScaling={false}
      style={{
        fontFamily: type,
        textAlign: alignment,
        color: colors[color],
        fontSize: size ? scale(size) : scale(14),
      }}
    >
      {children}
    </Text>
  );
}
