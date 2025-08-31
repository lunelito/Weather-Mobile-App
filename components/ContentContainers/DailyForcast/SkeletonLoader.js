import { View, StyleSheet, ScrollView } from "react-native";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function SkeletonLoader() {
  const { themeColors } = useSettingsDataContext();

  return (
    <ScrollView>
      {Array.from({ length: 14 }).map((_, index) => (
        <View style={styles.container} key={index}>
          <View style={styles.header}>
            <View
              style={[
                styles.daySkeleton,
                { backgroundColor: themeColors.SkeletonLoaderText },
              ]}
            />
            <View
              style={[
                styles.circleSkeleton,
                { backgroundColor: themeColors.SkeletonLoaderContainer },
              ]}
            />
          </View>

          <View style={styles.tempSection}>
            <View style={styles.tempBlock}>
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
            <View style={styles.tempBlock}>
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
          </View>

          <View style={styles.detailsSection}>
            <View>
              <View
                style={[
                  styles.detailSkeleton,
                  { backgroundColor: themeColors.SkeletonLoaderText },
                ]}
              />
              <View
                style={[
                  styles.detailSkeleton,
                  { backgroundColor: themeColors.SkeletonLoaderText },
                ]}
              />
            </View>
            <View>
              <View
                style={[
                  styles.detailSkeleton,
                  { backgroundColor: themeColors.SkeletonLoaderText },
                ]}
              />
              <View
                style={[
                  styles.detailSkeleton,
                  { backgroundColor: themeColors.SkeletonLoaderText },
                ]}
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  daySkeleton: { width: 100, height: 20, borderRadius: 4 },
  circleSkeleton: { width: 40, height: 40, borderRadius: 20 },
  tempSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tempBlock: { alignItems: "center" },
  labelSkeleton: { width: 50, height: 12, borderRadius: 4, marginBottom: 5 },
  valueSkeleton: { width: 40, height: 16, borderRadius: 4 },
  detailsSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailSkeleton: { width: 60, height: 12, borderRadius: 4, marginBottom: 5 },
});
