import { useEffect, useState } from "react";
import DoubleCircleContainer from "../../UI/DoubleCircleContainer";

export default function VisibilityContainer({ data }) {
  const visibilityMax = Number((data.visibility / 1000).toFixed(2));
  const [V, setV] = useState(0);

  useEffect(() => {
    let interval = null;

    if (V < visibilityMax) {
      interval = setInterval(() => {
        setV((prev) => {
          if (prev < visibilityMax) return Number((prev + 0.1).toFixed(2));
          clearInterval(interval);
          return prev;
        });
      }, 30);
    }

    return () => clearInterval();
  }, [V, visibilityMax]);

  return <DoubleCircleContainer text={V + "km"} icon={"eye"} />;
}
