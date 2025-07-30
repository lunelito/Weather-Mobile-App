import { StyleSheet, Text, View } from "react-native";

export default function SkeletonLoader({ screenHeight }) {
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
      color: "transparent",
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
      alignItems: "flex-end",
    },
    lodaingCirle: {
      height: 100,
      width: 100,
      backgroundColor:"#d6d6d6",
      borderRadius: 100,
    },
    laodingSquare: {
      backgroundColor: "#d6d6d6",
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.weatherIconContainer}>
        <View style={styles.lodaingCirle}></View>
      </View>
      <View style={styles.DataContainer}>
        <View style={styles.laodingSquare}>
          <Text style={[styles.text, { fontSize: 26 }]}>----,----</Text>
        </View>
        <View style={styles.laodingSquare}>
          <Text style={[styles.text, { fontSize: 20 }]}>----,----</Text>
        </View>
        <View style={styles.laodingSquare}>
          <Text style={[styles.text, { fontSize: 14 }]}>----,----</Text>
        </View>
      </View>
    </View>
  );
}
