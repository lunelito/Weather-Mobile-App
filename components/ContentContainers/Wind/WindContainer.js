import { StyleSheet, View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function WindContainer({ data }) {

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Gusts:</Text>
          <Text style={styles.text}>{data.wind.gust} m/s</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Direction:</Text>
          <Text style={styles.text}>
            {data.wind.deg}
            {"\u00B0"}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Speed:</Text>
          <Text style={styles.text}>{data.wind.speed} m/s</Text>
        </View>
      </View>
      <View style={styles.compassContainer}>
        <Entypo
          name="compass"
          color={"white"}
          size={100}
          style={{ transform: [{ rotate: `${-45 + data.wind.deg}deg` }] }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  dataContainer: {
    width: "60%",
    padding:10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  compassContainer: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  line: {
    height: 2,
    borderRadius: 10,
    width: "110%",
    backgroundColor: "#ffffff",
  },
  textContainer: {
    padding: 10,
    width:"100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
