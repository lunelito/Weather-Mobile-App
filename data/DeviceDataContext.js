import { createContext, useContext } from "react";
import { Dimensions } from "react-native";

const DeviceData = createContext();

export const useDeviceDataContext = () => useContext(DeviceData);

export const DeviceDataProvider = ({ children }) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <DeviceData.Provider value={{ screenWidth, screenHeight }}>
      {children}
    </DeviceData.Provider>
  );
};
