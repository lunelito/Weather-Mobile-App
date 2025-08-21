import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useSettingsDataContext } from "../../data/SettingsContext";

export default function RadioButton({ label, selected, onPress }) {
  const { themeColors } = useSettingsDataContext();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.circle,
          { borderColor: themeColors.textColor },
          selected && { borderColor: themeColors.textColor },
        ]}
      >
        {selected ? (
          <View
            style={[
              styles.innerCircle,
              { backgroundColor: themeColors.textColor },
            ]}
          />
        ) : null}
      </View>
      <Text style={{ color: themeColors.textColor }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  circle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
});
