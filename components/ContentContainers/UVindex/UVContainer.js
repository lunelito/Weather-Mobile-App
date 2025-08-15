import React from "react";
import useFetch from "../../../hooks/useFetch";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import UVSkeletonLoader from "./UVSkeletonLoader";

export default function UVContainer({ data }) {
  const { lat, lon } = data;

  const {
    data: onecallApi,
    isPending,
    error,
  } = useFetch(
    `https://api.open-meteo.com/v1/forecast?latitude=52.2297&longitude=21.0122&daily=uv_index_max&timezone=Europe/Warsaw`
  );

  const days = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  const getUVColor = (uv) => {
    if (uv < 3) return "#00ff00ad";
    if (uv < 6) return "#ffff00ad";
    if (uv < 8) return "#ff8000ad";
    if (uv < 11) return "#ff0000ad";
    return "#800080";
  };

  if (!onecallApi) return <Text style={{ color: "white" }}>Ładowanie...</Text>;

  const UVindexData = {
    time: onecallApi.daily.time,
    uvIndex: onecallApi.daily.uv_index_max,
  };

  return isPending ? (
  <UVSkeletonLoader />
) : (
  <View style={styles.container}>
    <View style={styles.singleCircleContainer}>
      <View
        style={[
          styles.circle,
          { backgroundColor: getUVColor(UVindexData.uvIndex[0]) },
        ]}
      >
        <Text style={styles.num}>{UVindexData.uvIndex[0]}</Text>
      </View>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false} // ukrywa pasek
      style={styles.manyCircleContainer}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {UVindexData.time.map((date, i) => {
        if (i === 0) return null;
        const dayName = days[new Date(date).getDay()];
        return (
          <View key={date} style={styles.singleLittleCircleContainer}>
            <Text style={styles.dayText}>{dayName}</Text>
            <View
              style={[
                styles.littleCircle,
                { backgroundColor: getUVColor(UVindexData.uvIndex[i]) },
              ]}
            >
              <Text style={styles.num}>{UVindexData.uvIndex[i]}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    gap:5
  },
  singleCircleContainer: {
    width:"30%",
    alignItems: "center",
    marginRight: 20,
  },
  circle: {
    height: 110,
    width: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  manyCircleContainer: {
    width:"70%",
    flexDirection: "row",
  },
  singleLittleCircleContainer: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  littleCircle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    color: "white",
    marginBottom: 4,
  },
  num: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});
