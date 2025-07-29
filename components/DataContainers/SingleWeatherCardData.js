import { View, Text, StyleSheet, Image } from "react-native";
import useFetch from "../../hooks/useFetch";
import SkeletonLoader from "../UI/SkeletonLoader";

export default function SingleWeatherCardData({ data }) {
  const { lat, lon } = data;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b697ed7a09995dacb97f44eb9978af3&units=metric`;

  const { data: weatherData, isPending, error } = useFetch(url);

  return (
    <View>
      {isPending ? (
        <SkeletonLoader />
      ) : error ? (
        <Text>Błąd: {error}</Text>
      ) : !weatherData ? (
        <Text>Brak danych</Text>
      ) : (
        <View style={styles.container}>
          <View>
          </View>
          <View>

          <Text style={styles.text}>{weatherData.name}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row"
  },
  text: {
    color: "white",
  },
  image:{
    width:100,
    height:100
  }
});
