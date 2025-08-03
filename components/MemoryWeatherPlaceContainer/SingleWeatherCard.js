import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDeviceDataContext } from "../../data/DeviceDataContext";
import { useNavigation } from "@react-navigation/native";
import SingleWeatherCardDataR from "../DataContainers/SingleWeatherContainers/SingleWeatherCardDataR";
import SingleWeatherCardDataL from "../DataContainers/SingleWeatherContainers/SingleWeatherCardDataL";

export default function SingleWeatherCard({ item, index }) {
  const { screenWidth, screenHeight } = useDeviceDataContext();

  const styles = StyleSheet.create({
    containerR: {
      width: screenWidth * 0.9,
      height: screenHeight * 0.15,
      marginVertical: 10,
      backgroundColor: "#121212",
      borderRadius: 12,
      flexDirection: "row",
      borderTopLeftRadius: screenHeight * 0.15,
      borderBottomLeftRadius: screenHeight * 0.15,
      marginRight: -40,
    },
    containerL: {
      width: screenWidth * 0.9,
      height: screenHeight * 0.15,
      marginVertical: 10,
      backgroundColor: "#121212",
      borderRadius: 12,
      flexDirection: "row",
      borderTopRightRadius: screenHeight * 0.15,
      borderBottomRightRadius: screenHeight * 0.15,
      marginLeft: -40,
    },
    pressed: {
      opacity: 0.75,
    },
  });

  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [
        index % 2 === 0 ? styles.containerR : styles.containerL,
        pressed && styles.pressed,
      ]}
      onPress={() =>
        navigation.navigate("SinglePlaceDetailMemory", { data: item })
      }
    >
      {index % 2 === 0 ? (
        <SingleWeatherCardDataR
          data={item}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
        />
      ) : (
        <SingleWeatherCardDataL
          data={item}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
        />
      )}
    </Pressable>
  );
}
