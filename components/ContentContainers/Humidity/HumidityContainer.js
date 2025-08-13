import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DoubleCircleContainer from "../../UI/DoubleCircleContainer";

export default function HumidityContainer({ data }) {
  const Humidity = data.main.humidity;
  const [H, setH] = useState(0);

  useEffect(() => {
    let interval = null;

    if (H < Humidity) {
      interval = setInterval(() => {
        setH((prev) => {
          if (prev < Humidity) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 30);
    }
    return () => clearInterval();
  }, [H, Humidity]);

  return <DoubleCircleContainer icon={"water"} text={H + "%"} />;
}
