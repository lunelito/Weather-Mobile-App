import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WeatherIcon from "../../UI/WeatherIcon";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function SingleForcastDaily({ item }) {
  const { themeColors } = useSettingsDataContext();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const time = new Date(item.dt * 1000);
  const dayName = days[time.getDay()];

  const sunrise = new Date(item.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(item.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={[styles.dayText, { color: themeColors.textColor }]}>
          {dayName}
        </Text>
        <WeatherIcon
          WeatherType={item.weather[0].main}
          size={40}
          color={themeColors.textColor}
        />
      </View>

      <View style={styles.tempSection}>
        <View style={styles.tempBlock}>
          <Text
            style={[styles.label, { color: themeColors.textColorSecondary }]}
          >
            Sunrise
          </Text>
          <Text style={[styles.value, { color: themeColors.textColor }]}>
            {sunrise}
          </Text>
          <Text style={[styles.value, { color: themeColors.textColor }]}>
            {item.temp.day}
            {"\u00B0"}
          </Text>
        </View>
        <View style={styles.tempBlock}>
          <Text
            style={[styles.label, { color: themeColors.textColorSecondary }]}
          >
            Sunset
          </Text>
          <Text style={[styles.value, { color: themeColors.textColor }]}>
            {sunset}
          </Text>
          <Text style={[styles.value, { color: themeColors.textColor }]}>
            {item.temp.night}
            {"\u00B0"}
          </Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <View>
          <Text
            style={[styles.label, { color: themeColors.textColorSecondary }]}
          >
            Humidity: {item.humidity}%
          </Text>
          <Text
            style={[styles.label, { color: themeColors.textColorSecondary }]}
          >
            Pressure: {item.pressure} hPa
          </Text>
        </View>
        <View>
          <Text
            style={[styles.label, { color: themeColors.textColorSecondary }]}
          >
            Wind: {item.speed} m/s
          </Text>
          <Text
            style={[styles.label, { color: themeColors.textColorSecondary }]}
          >
            Gust: {item.gust} m/s
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dayText: {
    fontSize: 22,
    fontWeight: "600",
  },
  tempSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tempBlock: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailsSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
