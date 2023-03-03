import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { screen } from "../../constants/screen";

export function VerticalDots() {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    height: screen.height * 0.02,
  },
  dot: { width: 1.5, height: 1.5, backgroundColor: colors.placeholder },
});
