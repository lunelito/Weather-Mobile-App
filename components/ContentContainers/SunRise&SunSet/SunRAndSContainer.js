import { StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function SunRAndSContainer({ data }) {
  const getHourFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const now = Math.floor(Date.now() / 1000);

  const dayLength = sunset - sunrise;
  const timeSinceSunrise = now - sunrise;
  let progress = (timeSinceSunrise / dayLength) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.sunRiseDataContainer}>
        <Text style={styles.text}>{getHourFromTimestamp(sunrise)}</Text>
        <Feather name="sun" size={44} color="white" />
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <View style={[styles.dot, { left: `${progress}%` }]} />
      </View>

      <View style={styles.sunSetDataContainer}>
        <Feather name="moon" size={44} color="white" />
        <Text style={styles.text}>{getHourFromTimestamp(sunset)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sunRiseDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: "100%",
    gap: 20,
  },
  sunSetDataContainer: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  lineContainer: {
    width: "50%",
    height: 20,
    justifyContent: "center",
    position: "relative",
  },
  line: {
    height: 2,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    position: "absolute",
    width: "100%",
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "white",
    position: "absolute",
    transform: [{ translateX: -7 }],
  },
});
