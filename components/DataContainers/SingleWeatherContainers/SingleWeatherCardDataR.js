import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import SkeletonLoader from "../../UI/SkeletonLoader";
import WeatherIcon from "../../UI/WeatherIcon";

export default function SingleWeatherCardDataR({
  data,
  screenHeight,
}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      padding: 16,
      justifyContent: "space-between",
      alignItems: "center",
      borderTopLeftRadius: screenHeight * 0.15,
      borderBottomLeftRadius: screenHeight * 0.15,
      overflow: "hidden",
    },
    text: {
      fontSize: 16,
      color: "white",
      textAlign: "right",
    },
    weatherIconContainer: {
      height: screenHeight * 0.1,
      width: screenHeight * 0.1,
      borderRadius: 8,
      borderTopLeftRadius: screenHeight * 0.15,
      borderBottomLeftRadius: screenHeight * 0.15,
      justifyContent: "center",
      alignItems: "center",
    },
    DataContainer: {
      gap: 10,
    },
    ImageContainer: {
      borderTopLeftRadius: screenHeight * 0.15,
      borderBottomLeftRadius: screenHeight * 0.15,
      overflow: "hidden",
    },
  });

  const { lat, lon } = data;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b697ed7a09995dacb97f44eb9978af3&units=metric`;

  const { data: weatherData, isPending, error } = useFetch(url);

  const [imageLoaded, setImageLoaded] = useState(false);

  if (error) {
    return <Text>Błąd: {error}</Text>;
  }

  if (!weatherData) {
    return <Text>Brak danych</Text>;
  }

  const weatherDataF = {
    city: weatherData.name,
    country: weatherData.sys.country,
    temp: weatherData.main.temp?.toFixed(1),
    tempMax: weatherData.main.temp_max?.toFixed(0),
    tempMin: weatherData.main.temp_min?.toFixed(0),
    weatherType: weatherData.weather[0].main,
  };

  const weatherImages = {
    Clear: require("../../../assets/photos/Clear.png"),
    Clouds: require("../../../assets/photos/Clouds.png"),
    Rain: require("../../../assets/photos/Rain.png"),
    Fog: require("../../../assets/photos/Fog.png"),
    Snow: require("../../../assets/photos/Snow.png"),
    Thunderstorm: require("../../../assets/photos/Thunderstorm.png"),
  }

  return (
    <ImageBackground
      style={styles.ImageContainer}
      source={weatherImages[weatherDataF.weatherType]}
      resizeMode="cover"
      onLoad={() => setImageLoaded(true)}
    >
      {isPending || (!imageLoaded && <SkeletonLoader screenHeight={screenHeight} />)}
      {imageLoaded && !isPending && (
        <View style={styles.container}>
          <View style={styles.weatherIconContainer}>
            <WeatherIcon WeatherType={weatherDataF.weatherType} />
          </View>
          <View style={styles.DataContainer}>
            <Text style={[styles.text, { fontSize: 26 }]}>
              {weatherDataF.city}, {weatherDataF.country}
            </Text>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {weatherDataF.temp}
              {"\u00B0"}
            </Text>
            <Text style={[styles.text, { fontSize: 14 }]}>
              from {weatherDataF.tempMax}
              {"\u00B0"} to {weatherDataF.tempMin}
              {"\u00B0"}
            </Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}
