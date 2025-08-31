import useFetch from "../../../hooks/useFetch";
import { View, Text, StyleSheet } from "react-native";
import ComponentLevel from "./ComponentLevel";
import SkeletonLoader from "./SkeletonLoader";

export default function AirPolution({ data }) {
  const { lat, lon } = data;

  const { data: AirPolutionData, isPending, error } = useFetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=4b697ed7a09995dacb97f44eb9978af3`
  );

  const AQI_LEVELS = {
    1: { label: "Excellent", color: "green" },
    2: { label: "Fair", color: "lightgreen" },
    3: { label: "Moderate", color: "yellow" },
    4: { label: "Unhealthy", color: "orange" },
    5: { label: "Very Unhealthy", color: "red" },
  };

  if (isPending || !AirPolutionData) {
    return <SkeletonLoader />;
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>
      </View>
    );
  }


  const currentAQI = AQI_LEVELS[AirPolutionData.list[0].main.aqi];

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.aqiText, { color: currentAQI.color }]}>
          {currentAQI.label} air condition
        </Text>
      </View>
      <View style={styles.infos}>
        {[
          { key: "co", label: "Carbon monoxide" },
          { key: "no", label: "Nitric oxide" },
          { key: "no2", label: "Nitrogen dioxide" },
          { key: "o3", label: "Ozone" },
          { key: "so2", label: "Sulfur dioxide" },
          { key: "pm2_5", label: "Particulate Matter" },
          { key: "pm10", label: "Particulate Matter" },
          { key: "nh3", label: "Ammonia" },
        ].map(({ key, label }) => (
          <ComponentLevel
            key={key}
            value={AirPolutionData.list[0]?.components[key]}
            component={key}
          >
            {label + ` (${key.toUpperCase()})`}
          </ComponentLevel>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  aqiText: {
    textAlign: "center",
    fontWeight: "700",
  },
  infos: {
    height: "80%",
    gap: 5,
  },
});
