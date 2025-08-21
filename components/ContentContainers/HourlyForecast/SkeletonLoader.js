import { View, Text, StyleSheet } from "react-native";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function SkeletonLoader() {
  const {themeColors} = useSettingsDataContext()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={{backgroundColor:themeColors.SkeletonLoaderText}}>
          <Text style={[styles.text, { fontSize: 24 }]}>-----</Text>
        </View>
        <View style={{backgroundColor:themeColors.SkeletonLoaderText}}>
          <Text style={[styles.text, { fontSize: 14 }]}>-------</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={[styles.lodaingCirle,{backgroundColor:themeColors.SkeletonLoaderText}]}></View>
        <View style={{backgroundColor:themeColors.SkeletonLoaderText}}>
          <Text style={[styles.text, { fontSize: 14 }]}>---</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: 70,
    marginRight: 8,
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    gap: 15,
  },
  text: {
    color: "transparent",
  },
  lodaingCirle: {
    height: 68,
    width:68,
    borderRadius: 100,
  }
});
