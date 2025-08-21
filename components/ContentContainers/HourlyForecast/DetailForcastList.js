import React, { useLayoutEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import SingleForcastHour from "./SingleForcastHour";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function DetailForcastList({ route, navigation }) {
  const HourlyForecastData = route.params.HourlyForecastData;

  const { themeColors } = useSettingsDataContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Hourly Forecast",
      headerStyle: { backgroundColor: themeColors.backgroundColor },
      contentStyle: { backgroundColor: themeColors.secondaryBackgroundColor },
      headerTintColor: themeColors.textColor,
    });
  }, [navigation, themeColors]);

  const groupForecastByDay = (forecastList) => {
    return forecastList.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const groupedData =
    HourlyForecastData && groupForecastByDay(HourlyForecastData.list);

  return (
    <ScrollView>
      {HourlyForecastData &&
        Object.entries(groupedData).map(([date, hours]) => {
          const dayName = days[new Date(date).getDay()];
          return (
            <View key={date} style={{ marginVertical: 10, flex: 1 }}>
              <View style={styles.textContainer}>
                <Text style={[styles.text, { color: themeColors.textColor }]}>
                  {dayName}
                </Text>
                <Text style={[styles.text, { color: themeColors.textColor }]}>
                  {date}
                </Text>
              </View>
              <FlatList
                data={hours}
                renderItem={({ item }) => <SingleForcastHour item={item} />}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          );
        })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00ff00",
  },
  textContainer: {
    justifyContent: "space-between",
    marginVertical: 30,
    flexDirection: "row",
    padding: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
