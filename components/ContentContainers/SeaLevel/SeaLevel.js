import { useEffect, useState } from "react";
import DoubleCircleContainer from "../../UI/DoubleCircleContainer";

export default function SeaLevel({ data }) {
  const seaLevel = data.elevation;
  const [SL, setSL] = useState(0);

  useEffect(() => {
    let interval = null;

    if (SL < seaLevel) {
      interval = setInterval(() => {
        setSL((prev) => {
          if (prev < seaLevel) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 30);
    }
    return () => clearInterval();
  }, [SL, seaLevel]);

  return <DoubleCircleContainer icon={"arrow-up"} text={SL + "m"} />;
}
