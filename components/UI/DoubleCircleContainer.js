import GradientCircle from "./GradientCircle";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DoubleCircleContainer({ text, icon }) {
  return (
    <View style={styles.container}>
      <View style={styles.Circle}>
        <GradientCircle>
          <Ionicons color={"black"} name={icon} size={"60"} />
        </GradientCircle>
      </View>
      <View style={styles.dataCircle}>
        <Text style={{ color: "white", fontSize: 16 }}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  Circle: {
    height: 80,
    width: 80,
    left: -20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  WhiteCircle: {
    backgroundColor: "#ffffff",
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  dataCircle: {
    backgroundColor: "rgba(0,0,0,0.9)",
    height: 80,
    width: 80,
    position: "absolute",
    borderRadius: 100,
    right: -10,
    justifyContent: "center",
    alignItems: "center",
  },
});
