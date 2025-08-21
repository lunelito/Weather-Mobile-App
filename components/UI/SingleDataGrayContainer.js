import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useDeviceDataContext } from "../../data/DeviceDataContext";
import { useSettingsDataContext } from "../../data/SettingsContext";

export default function SingleDataGrayContainer({ x, y, title, children }) {
  const { screenWidth } = useDeviceDataContext();
  const { themeColors } = useSettingsDataContext();

  const boxSize = screenWidth * 0.5 - (x % 2 === 0 ? 20 : 25);

  return (
    <View
      style={[
        styles.container,
        {
          width: boxSize * x,
          height: boxSize * y,
          backgroundColor: themeColors.containerColor,
        },
      ]}
    >
      <View style={styles.row}>
        <View
          style={[styles.line, { backgroundColor: themeColors.textColor }]}
        />
        <Text style={[styles.text, { color: themeColors.textColor }]}>
          {title}
        </Text>
        <View
          style={[styles.line, { backgroundColor: themeColors.textColor }]}
        />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 8,
    margin: 5,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  line: {
    flex: 1,
    height: 1,
  },
});
