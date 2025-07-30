import { createContext, useContext, useState, useEffect } from "react";
import { Storage } from "expo-storage";

const STORAGE_KEY = "weather_locations";

const SavedWeatherLocationsContext = createContext();

export const useSavedWeatherLocations = () =>
  useContext(SavedWeatherLocationsContext);

export const SavedWeatherLocationsProvider = ({ children }) => {
  const [weatherLocations, setWeatherLocations] = useState([]);


  useEffect(() => {
    const laodWeatherLocations = async () => {
      try {
        const data = await Storage.getItem({ key: STORAGE_KEY });
        if (data) {
          setWeatherLocations(JSON.parse(data));
        } else {
          setWeatherLocations([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    laodWeatherLocations();
  }, []);

  useEffect(() => {
    const saveWeatherLocations = async () => {
      try {
        await Storage.setItem({
          key: STORAGE_KEY,
          value: JSON.stringify(weatherLocations),
        });
      } catch (err) {
        console.log(err);
      }
    };
    saveWeatherLocations();
  }, [weatherLocations]);

  return (
    <SavedWeatherLocationsContext.Provider
      value={{
        weatherLocations,
        setWeatherLocations,
      }}
    >
      {children}
    </SavedWeatherLocationsContext.Provider>
  );
};
