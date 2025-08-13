import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


export default function GradientCircle({children}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["white", "rgba(0, 0, 0,0.3)"]}
        start={{ x: 0.5, y: 0 }}   
        end={{ x: 0.5, y: 1 }}     
        style={styles.circle}
      >
        {children}
      </LinearGradient>
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
    alignItems:"center",
    justifyContent:"center"
  },
});
