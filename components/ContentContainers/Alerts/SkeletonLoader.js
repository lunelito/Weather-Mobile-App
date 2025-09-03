import { View, StyleSheet, ScrollView } from "react-native";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function SkeletonLoader() {
  const { themeColors } = useSettingsDataContext();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {Array.from({ length: 3 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.alertCard,
            { borderColor: themeColors.SkeletonLoaderText },
          ]}
        >
          {/* Headline */}
          <View
            style={[
              styles.titleSkeleton,
              { backgroundColor: themeColors.SkeletonLoaderText },
            ]}
          />

          {/* Agency / Start / End */}
          <View style={styles.col}>
            {Array.from({ length: 3 }).map((_, i) => (
              <View key={i} style={styles.row}>
                <View
                  style={[
                    styles.labelSkeleton,
                    { backgroundColor: themeColors.SkeletonLoaderText },
                  ]}
                />
                <View
                  style={[
                    styles.valueSkeleton,
                    { backgroundColor: themeColors.SkeletonLoaderContainer },
                  ]}
                />
              </View>
            ))}
          </View>

          {/* Description */}
          <View
            style={[
              styles.descSkeleton,
              { backgroundColor: themeColors.SkeletonLoaderText },
            ]}
          />
          <View
            style={[
              styles.instructionSkeleton,
              { backgroundColor: themeColors.SkeletonLoaderText },
            ]}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  alertCard: {
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  titleSkeleton: {
    width: "60%",
    height: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  col: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelSkeleton: {
    width: 60,
    height: 14,
    borderRadius: 4,
  },
  valueSkeleton: {
    width: 80,
    height: 14,
    borderRadius: 4,
  },
  descSkeleton: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    marginBottom: 5,
  },
  instructionSkeleton: {
    width: "80%",
    height: 20,
    borderRadius: 4,
  },
});
