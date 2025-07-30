import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

const weatherIcons = {
  Clear: "sun", //image video
  Clouds: "cloud",//iamge video
  Rain: "cloud-rain", //iamge video
  Thunderstorm: "zap", // image video
  Drizzle: "cloud-rain", 
  Snow: "cloud-snow", // iamge video
  Mist: "wind",
  Smoke: "wind",
  Haze: "wind",
  Dust: "wind",
  Fog: "wind", // iamge video
  Sand: "wind",
  Ash: "wind",
  Squall: "wind",
  Tornado: "wind",
};

export default function WeatherIcon({
  WeatherType,
  size = 68,
  color = "#ffffff",
}) {
  const iconName = weatherIcons[WeatherType] || "help-circle";

  return (
    <View>
      <Feather name={iconName} size={size} color={color} />
    </View>
  );
}
