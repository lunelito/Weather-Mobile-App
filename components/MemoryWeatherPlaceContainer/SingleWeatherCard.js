import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDeviceDataContext } from "../../data/DeviceDataContext";
import { useNavigation } from "@react-navigation/native";
import SingleWeatherCardData from "../DataContainers/SingleWeatherCardData";

export default function SingleWeatherCard({ item }) {
  const { screenWidth, screenHeight } = useDeviceDataContext();

  const styles = StyleSheet.create({
    container: {
      width: screenWidth * 0.9,
      height: screenHeight * 0.15,
      padding: 16,
      marginVertical: 10,
      backgroundColor: "black",
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      borderTopLeftRadius: screenHeight * 0.15,
      borderBottomLeftRadius: screenHeight * 0.15,
    },
    pressed: {
      opacity: 0.75,
    },
  });

  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() =>
        navigation.navigate("SinglePlaceDetailMemory", { data: item })
      }
    >
      <SingleWeatherCardData data={item} />
    </Pressable>
  );
}
