import { StyleSheet, View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function WindContainer({ data }) {
  const { themeColors } = useSettingsDataContext();

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: themeColors.textColor }]}>
            Gusts:
          </Text>
          <Text style={[styles.text, { color: themeColors.textColor }]}>
            {data.wind.gust} m/s
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: themeColors.textColor }]}>
            Direction:
          </Text>
          <Text style={[styles.text, { color: themeColors.textColor }]}>
            {data.wind.deg}
            {"\u00B0"}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: themeColors.textColor }]}>
            Speed:
          </Text>
          <Text style={[styles.text, { color: themeColors.textColor }]}>
            {data.wind.speed} m/s
          </Text>
        </View>
      </View>
      <View style={styles.compassContainer}>
        <Entypo
          name="compass"
          color={themeColors.textColor}
          size={100}
          style={{ transform: [{ rotate: `${-45 + data.wind.deg}deg` }] }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  dataContainer: {
    width: "60%",
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  compassContainer: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  line: {
    height: 2,
    borderRadius: 10,
    width: "110%",
  },
  textContainer: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
