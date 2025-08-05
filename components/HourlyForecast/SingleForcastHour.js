import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WeatherIcon from "../UI/WeatherIcon";

export default function SingleForcastHour({ item }) {
  const SingleForcastHourDataF = {
    day: item.dt_txt.split(" ")[0].slice(5, 10),
    time: item.dt_txt.split(" ")[1].slice(0, 5),
    weatherType: item.weather[0].main,
    temp: item.main.temp?.toFixed(1),
    tempMax: item.main.temp_max?.toFixed(0),
    tempMin: item.main.temp_min?.toFixed(0),
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontSize: 20 }]}>
          {SingleForcastHourDataF.day}
        </Text>
        <Text style={[styles.text, { fontSize: 17 }]}>
          {SingleForcastHourDataF.time}
        </Text>
        <Text style={[styles.text, { fontSize: 14 }]}>
          {SingleForcastHourDataF.tempMin}
          {"\u00B0"}-{SingleForcastHourDataF.tempMax}
          {"\u00B0"}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <WeatherIcon
          WeatherType={SingleForcastHourDataF.weatherType}
          size={50}
        />
        <Text style={[styles.text, { fontSize: 17 }]}>
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
    marginRight: 8,
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "white",
  },
});
