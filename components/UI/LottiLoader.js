import { View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import loaderAnimation from "../../assets/animations/loader.json";

export default function LottiLoader({ speed = 1 }) {
  const { width, height } = Dimensions.get("window");

  return (
      <LottieView
        source={loaderAnimation}
        autoPlay
        loop
        speed={speed}
        style={{
          width: width * 1.5,
          height: width * 1.5,
        }}
      />
  );
}
