import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WeatherIcon from "../../UI/WeatherIcon";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function SingleForcastHour({ item }) {
  const SingleForcastHourDataF = {
    day: item.dt_txt.split(" ")[0].slice(5, 10),
    time: item.dt_txt.split(" ")[1].slice(0, 5),
    weatherType: item.weather[0].main,
    temp: item.main.temp?.toFixed(1),
    tempMax: item.main.temp_max?.toFixed(0),
    tempMin: item.main.temp_min?.toFixed(0),
  };
  const { themeColors } = useSettingsDataContext();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={[styles.text, { fontSize: 22, color: themeColors.textColor }]}
        >
          {SingleForcastHourDataF.time}
        </Text>
        <Text style={[styles.text, { fontSize: 14,color: themeColors.textColor }]}>
          {SingleForcastHourDataF.tempMin}
          {"\u00B0"}-{SingleForcastHourDataF.tempMax}
          {"\u00B0"}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <WeatherIcon
          WeatherType={SingleForcastHourDataF.weatherType}
          size={50}
          color={themeColors.textColor}
        />
        <Text style={[styles.text, { fontSize: 17,color: themeColors.textColor }]}>
          {SingleForcastHourDataF.temp}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: 70,
    marginRight: 9,
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    gap: 20,
  },
  text: {
    color: "white",
  },
});
