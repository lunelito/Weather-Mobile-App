import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSettingsDataContext } from "../../data/SettingsContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SingleLayer({  type, onPress }) {
  const { themeColors } = useSettingsDataContext();

  const iconMap = {
    clouds_new: "weather-cloudy",
    temp_new: "thermometer",
    precipitation_new: "weather-rainy",
    pressure_new: "gauge",
    wind_new: "weather-windy",
  };

  const iconName = iconMap[type] || "alert-circle";


  return (
    <TouchableOpacity onPress={() => onPress(type)}>
      <View
        style={[
          styles.container,
          { backgroundColor: themeColors.backgroundColor },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={36}
          color={themeColors.textColor}
          style={{ width: "100%", textAlign: "center" }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
