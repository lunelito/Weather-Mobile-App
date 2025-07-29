import { View, Text } from "react-native";
import useFetch from "../../hooks/useFetch";
import SkeletonCard from "../UI/SkeletonLoader";

export default function SinglePlaceDataContainer({ data }) {
  const { lat, lon } = data;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b697ed7a09995dacb97f44eb9978af3&units=metric`;

  const { data: weatherData, isPending, error } = useFetch(url);

  return (
    <View>
      {isPending ? (
        <SkeletonCard />
      ) : error ? (
        <Text>Błąd: {error}</Text>
      ) : !weatherData ? (
        <Text>Brak danych</Text>
      ) : (
        <View>
          <Text>Miasto: {weatherData.name}</Text>
          <Text>Temperatura: {Math.round(weatherData.main.temp)} °C</Text>
          <Text>Opis: {weatherData.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}
