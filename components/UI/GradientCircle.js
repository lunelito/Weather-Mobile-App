import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


export default function GradientCircle() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["white", "rgba(0, 0, 0,0.1)"]}
        start={{ x: 0.4, y: 0 }}   
        end={{ x: 0.5, y: 1 }}     
        style={styles.circle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 50,  
  },
});
