import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDeviceDataContext } from "../../data/DeviceDataContext";
import { useNavigation } from "@react-navigation/native";
import UserLocationData from "./UserLocationData";

export default function UserLocationCard({ item }) {
  const { screenWidth, screenHeight } = useDeviceDataContext();

  const styles = StyleSheet.create({
    container: {
      width: screenWidth * 0.9,
      justifyContent:"center",
      height: screenHeight * 0.15,
      marginBottom: 50,
      borderRadius: 12,
      flexDirection: "row",
      borderTopLeftRadius: screenHeight * 0.15,
      borderBottomLeftRadius: screenHeight * 0.15,
      borderTopRightRadius: screenHeight * 0.15,
      borderBottomRightRadius: screenHeight * 0.15,
    },
    pressed: {
      opacity: 0.75,
    },
  });

  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => navigation.navigate("UserLocationDetail", { data: item })}
    >
      <UserLocationData
        data={item}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
      />
    </Pressable>
  );
}
