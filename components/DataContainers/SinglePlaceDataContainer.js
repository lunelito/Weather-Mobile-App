import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import useFetch from "../../hooks/useFetch";
import { useLayoutEffect, useState } from "react";
import SkeletonCard from "../UI/SkeletonLoader";
import { useNavigation } from "@react-navigation/native";
import SingleDataGrayContainer from "../UI/SingleDataGrayContainer";
import ForecastList from "../ContentContainers/HourlyForecast/ForecastList";
import AirPolution from "../ContentContainers/AirPolution/AirPolutionList";
import HumidityContainer from "../ContentContainers/Humidity/HumidityContainer";
import VisibilityContainer from "../ContentContainers/Visibility/VisibilityContainer";
import WindContainer from "../ContentContainers/Wind/WindContainer";

export default function SinglePlaceDataContainer({ data, deleteFromStorage }) {
  const { lat, lon } = data;

  const navigation = useNavigation();

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b697ed7a09995dacb97f44eb9978af3&units=metric`;
  const { data: weatherData, isPending, error } = useFetch(url);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useLayoutEffect(() => {
    if (weatherData?.name) {
      navigation.setOptions({
        headerTitle: weatherData.name,
        headerTransparent: true,
        headerStyle: {
          backgroundColor:
            scrollY > 10 ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0)",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
      });
    }
  }, [navigation, weatherData, scrollY]);

  if (error) return <Text>Błąd: {error}</Text>;
  if (!weatherData) return <SkeletonCard />;

  const weatherDataF = {
    city: weatherData.name,
    country: weatherData.sys.country,
    temp: weatherData.main.temp?.toFixed(1),
    tempMax: weatherData.main.temp_max?.toFixed(0),
    tempMin: weatherData.main.temp_min?.toFixed(0),
    weatherType: weatherData.weather[0].main,
  };

  const weatherImages = {
    Clear: require("../../assets/photos/Clear.png"),
    Clouds: require("../../assets/photos/Clouds.png"),
    Rain: require("../../assets/photos/Rain.png"),
    Fog: require("../../assets/photos/Fog.png"),
    Snow: require("../../assets/photos/Snow.png"),
    Thunderstorm: require("../../assets/photos/Thunderstorm.png"),
  };
  return (
    <ImageBackground
      style={styles.ImageContainer}
      source={weatherImages[weatherDataF.weatherType]}
      resizeMode="cover"
      onLoad={() => setImageLoaded(true)}
    >
      <ScrollView
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <View style={styles.container}>
          {isPending ||
            (!imageLoaded && (
              <ActivityIndicator
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 100,
                }}
                size="large"
                color="#ccc"
              />
            ))}
          {imageLoaded && !isPending && (
            <>
              <SingleDataGrayContainer x={2} y={1} title={"Wind"}>
                <WindContainer data={weatherData} />
              </SingleDataGrayContainer>
              <SingleDataGrayContainer x={1} y={1} title={"Humidity"}>
                <HumidityContainer data={weatherData} />
              </SingleDataGrayContainer>
              <SingleDataGrayContainer x={1} y={1} title={"Visibility"}>
                <VisibilityContainer data={weatherData} />
              </SingleDataGrayContainer>
              <SingleDataGrayContainer x={2} y={2} title={"Hourly forecast"}>
                <ForecastList data={data} />
              </SingleDataGrayContainer>
              <SingleDataGrayContainer x={2} y={2} title={"Air Polution"}>
                <AirPolution data={data} />
              </SingleDataGrayContainer>
              <Button
                title="delete from memory"
                onPress={deleteFromStorage}
                color={"white"}
              />
            </>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ImageContainer: {
    flex: 1,
    backgroundColor: "#121212",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    marginVertical: 120,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});
