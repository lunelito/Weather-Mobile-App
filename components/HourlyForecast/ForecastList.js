import React from "react";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SingleForcastHour from "./SingleForcastHour";
import { useNavigation } from "@react-navigation/native";
import SkeletonLoader from "./SkeletonLoader";

export default function ForecastList({ data }) {
  const { lat, lon } = data;

  const {
    data: HourlyForecastData,
    isPending,
    error,
  } = useFetch(
    `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric&appid=4b697ed7a09995dacb97f44eb9978af3`
  );

  const navigation = useNavigation();

  const today = HourlyForecastData && HourlyForecastData.list[0].dt;
  const oneDay = 129600;

  const dataOneday =
    HourlyForecastData &&
    HourlyForecastData.list.filter((item) => item.dt < today + oneDay);

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <>
      {isPending ? (
        <ScrollView  horizontal={true}>
          {Array.from({ length: 20 }).map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={dataOneday}
          renderItem={({ item }) => <SingleForcastHour item={item} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
      <Button
        title="see more of hourly Forcast"
        color={"white"}
        onPress={() =>
          navigation.navigate("DetailForcastList", {
            HourlyForecastData: HourlyForecastData,
          })
        }
      />
    </>
  );
}