import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useDeviceDataContext } from "../../data/DeviceDataContext";

export default function SingleDataGrayContainer({ x, y, title, children }) {
  const { screenWidth } = useDeviceDataContext();

  const boxSize = screenWidth * 0.5 - (x % 2 === 0 ? 30 : 40);

  return (
    <View
      style={[styles.container, { width: boxSize * x, height: boxSize * y }]}
    >
      <View style={styles.row}>
        <View style={styles.line} />
        <Text style={styles.text}>{title}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.9)",
    padding: 20,
    borderRadius: 8,
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    marginHorizontal: 8
  },
   row: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    margin: 10,
  },
});
