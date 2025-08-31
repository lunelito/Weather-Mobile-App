import { ScrollView, StyleSheet, Text } from "react-native";
import SkeletonLoader from "./SkeletonLoader";
import { useSettingsDataContext } from "../../../data/SettingsContext";
import useFetch from "../../../hooks/useFetch";
import SingleForcastDaily from "./SingleForcastDaily";

export default function DailyForcastList({ data }) {
  const { lat, lon } = data;

  const { units } = useSettingsDataContext();

  const {
    data: DailyForecastData,
    isPending,
    error,
  } = useFetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=${units}&cnt=14&appid=4b697ed7a09995dacb97f44eb9978af3`
  );

  if (isPending) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <Text>error : {error}</Text>;
  }
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {DailyForecastData?.list?.slice(1).map((item) => (
        <SingleForcastDaily key={item.dt.toString()} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});
