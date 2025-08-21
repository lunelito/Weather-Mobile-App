import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function UVSkeletonLoader() {
  const { themeColors } = useSettingsDataContext();

  return (
    <View style={styles.container}>
      <View style={styles.singleCircleContainer}>
        <View
          style={[
            styles.circle,
            { backgroundColor: themeColors.SkeletonLoaderText },
          ]}
        >
          <View>
            <Text style={styles.num}></Text>
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        style={styles.manyCircleContainer}
        contentContainerStyle={{ alignItems: "center" }}
        showsHorizontalScrollIndicator={false}
      >
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <View style={styles.singleLittleCircleContainer}>
              <Text
                style={[
                  styles.dayText,
                  { backgroundColor: themeColors.SkeletonLoaderText },
                ]}
              >
                .........
              </Text>
              <View
                style={[
                  styles.littleCircle,
                  { backgroundColor: themeColors.SkeletonLoaderText },
                ]}
              >
                <Text style={styles.num}></Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    gap: 5,
  },
  singleCircleContainer: {
    width: "30%",
    alignItems: "center",
    marginRight: 20,
  },
  circle: {
    height: 110,
    width: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  manyCircleContainer: {
    width: "70%",
    flexDirection: "row",
  },
  singleLittleCircleContainer: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  littleCircle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    color: "transparent",
    marginBottom: 4,
  },
  num: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});
