import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import useFetch from "../../hooks/useFetch";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SingleDataGrayContainer from "../UI/SingleDataGrayContainer";
import ForecastList from "../ContentContainers/HourlyForecast/ForecastList";
import AirPolution from "../ContentContainers/AirPolution/AirPolutionList";
import HumidityContainer from "../ContentContainers/Humidity/HumidityContainer";
import VisibilityContainer from "../ContentContainers/Visibility/VisibilityContainer";
import WindContainer from "../ContentContainers/Wind/WindContainer";
import SunRAndSContainer from "../ContentContainers/SunRise&SunSet/SunRAndSContainer";
import SeaLevel from "../ContentContainers/SeaLevel/SeaLevel";
import PressureContainer from "../ContentContainers/Pressure/PressureContainer";
import UVContainer from "../ContentContainers/UVindex/UVContainer";
import { useSettingsDataContext } from "../../data/SettingsContext";
import IconButton from "../UI/IconButton";
import LottiLoader from "../UI/LottiLoader";
import DailyForcastList from "../ContentContainers/DailyForcast/DailyForcastList";

export default function SinglePlaceDataContainer({
  data,
  moreContentS,
  moreContentM,
}) {
  const { lat, lon } = data;
  const navigation = useNavigation();
  const { units, themeColors } = useSettingsDataContext();

  const urlOpenWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b697ed7a09995dacb97f44eb9978af3&units=${units}`;

  const {
    data: openWeatherApi,
    isPending: openWeatherApiIsPending,
    error: openWeatherApiError,
  } = useFetch(urlOpenWeather);

  const urlMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max&hourly=surface_pressure,pressure_msl&timezone=Europe/Warsaw`;

  const {
    data: meteoApi,
    isPending: meteoIsPending,
    error: meteoError,
  } = useFetch(urlMeteo);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const isPending = openWeatherApiIsPending || meteoIsPending;
  const error = openWeatherApiError || meteoError;

  const weatherData = openWeatherApi;
  const meteoData = meteoApi;

  useLayoutEffect(() => {
    if (isPending || !imageLoaded || !weatherData) {
      navigation.setOptions({
        headerTitle: "",
        headerTransparent: true,
        headerTintColor: themeColors.textColor,
        headerRight: () => null,
        headerLeft: () => (
          <IconButton
            color={themeColors.textColor}
            icon="arrow-back-outline"
            size={28}
            onPress={() => navigation.goBack()}
          />
        ),
      });
    }
    if (!isPending && imageLoaded && weatherData) {
      navigation.setOptions({
        headerTitle: weatherData.name,
        headerTransparent: true,
        headerStyle: {
          backgroundColor:
            scrollY > 10 ? themeColors.containerColor : "rgba(255,255,255,0)",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: themeColors.textColor,
        headerLeft: () => (
          <IconButton
            color={themeColors.textColor}
            icon="arrow-back-outline"
            size={28}
            onPress={() => navigation.goBack()}
          />
        ),
        ...(moreContentS ? { headerRight: () => moreContentS } : {}),
      });
    }
  }, [navigation, weatherData, scrollY, themeColors, imageLoaded]);

  if (error) return <Text style={{ fontSize: 14 }}>Błąd: {error}</Text>;

  const weatherDataF = weatherData && {
    city: weatherData.name || "",
    country: weatherData.sys?.country || "",
    temp: weatherData.main?.temp?.toFixed(1) || "0",
    tempMax: weatherData.main?.temp_max?.toFixed(0) || "0",
    tempMin: weatherData.main?.temp_min?.toFixed(0) || "0",
    weatherType: weatherData.weather?.[0]?.main || "Clear",
  };

  const weatherImages = {
    Clear: require("../../assets/photos/Clear.png"),
    Clouds: require("../../assets/photos/Clouds.png"),
    Rain: require("../../assets/photos/Rain.png"),
    Fog: require("../../assets/photos/Fog.png"),
    Snow: require("../../assets/photos/Snow.png"),
    Thunderstorm: require("../../assets/photos/Thunderstorm.png"),
  };

  if (isPending || !imageLoaded || !weatherData) {
    return (
      <ImageBackground
        style={[
          styles.ImageContainer,
          { backgroundColor: themeColors.backgroundColor },
        ]}
        source={weatherData && weatherImages[weatherDataF?.weatherType]}
        resizeMode="cover"
        onLoad={() => setImageLoaded(true)}
      >
        <View style={styles.containerLoader}>
          <LottiLoader />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      style={styles.ImageContainer}
      source={weatherImages[weatherDataF.weatherType] || null}
      resizeMode="cover"
      onLoad={() => setImageLoaded(true)}
    >
      <ScrollView
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <View style={[styles.container, moreContentS && { paddingBottom: 50 }]}>
          <SingleDataGrayContainer x={2} y={2} title="Hourly forecast">
            <ForecastList data={data} />
          </SingleDataGrayContainer>

          <SingleDataGrayContainer x={2} y={1} title="Sun">
            <SunRAndSContainer data={weatherData} />
          </SingleDataGrayContainer>

          <SingleDataGrayContainer x={2} y={1} title="UV index">
            <UVContainer data={meteoData} />
          </SingleDataGrayContainer>

          <SingleDataGrayContainer x={2} y={3} title="Daily forecast">
            <DailyForcastList data={data} />
          </SingleDataGrayContainer>

          <SingleDataGrayContainer x={1} y={1} title="Pressure">
            <PressureContainer data={meteoData} />
          </SingleDataGrayContainer>

          <SingleDataGrayContainer x={1} y={1} title="Sea level">
            <SeaLevel data={meteoData} />
          </SingleDataGrayContainer>

          <SingleDataGrayContainer x={2} y={1} title="Wind">
            <WindContainer data={weatherData} />
          </SingleDataGrayContainer>

          <SingleDataGrayContainer x={2} y={2} title="Air Polution">
            <AirPolution data={data} />
          </SingleDataGrayContainer>

          <SingleDataGrayContainer x={1} y={1} title="Humidity">
            <HumidityContainer data={weatherData} />
          </SingleDataGrayContainer>

          <SingleDataGrayContainer x={1} y={1} title="Visibility">
            <VisibilityContainer data={weatherData} />
          </SingleDataGrayContainer>

          {moreContentM}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ImageContainer: {
    flex: 1,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    marginTop: 120,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  containerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
