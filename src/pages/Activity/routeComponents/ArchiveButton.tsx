import React from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { ACIcon, ACText } from "../../../components";
import { colors } from "../../../constants/colors";

interface Props {
  isArchived: boolean;
  onPress: () => void;
  loading?: boolean;
}

export function ArchiveButton({ isArchived, onPress, loading }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      hitSlop={{ top: 10, bottom: 5, left: 5, right: 10 }}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.snowWhite} />
      ) : (
        <>
          <View style={styles.buttonWrapper}>
            <ACIcon
              name={isArchived ? "download-cloud" : "upload-cloud"}
              color={"snowWhite"}
              specificSize={16}
            />
          </View>

          <ACText type={"regular"} size={14} color="snowWhite">
            {isArchived ? "Unarchive" : "Archive"}
          </ACText>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 6,
    width: "35%",
  },
  buttonWrapper: {
    paddingRight: 6,
  },
});
