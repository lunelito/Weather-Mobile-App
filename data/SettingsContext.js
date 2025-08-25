import Storage from "expo-storage";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useColorScheme } from "react-native";

const SettingsData = createContext();

const STORAGE_KEY_U = "user_settings_units";
const STORAGE_KEY_T = "user_settings_theme";

export const useSettingsDataContext = () => useContext(SettingsData);

const darkTheme = {
  backgroundColor: "#111111",
  textColor: "#f5f5f5",
  secondaryBackgroundColor: "#1a1a1a",
  containerColor: "rgba(0,0,0,0.8)",
  SkeletonLoaderText: "#444444",
  SkeletonLoaderContainer: "#2a2a2a",
};

const lightTheme = {
  backgroundColor: "#ffffff",
  textColor: "#111111",
  secondaryBackgroundColor: "#efefef",
  containerColor: "rgba(255, 255, 255, 0.8)",
  SkeletonLoaderText: "#e0e0e0",
  SkeletonLoaderContainer: "#eaeaea",
};

export const SettingsProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [units, SetUnits] = useState("metric");
  const [theme, setTheme] = useState("dark");

  const themeColors = useMemo(() => {
    const currentTheme = theme === "auto" ? systemTheme : theme;
    return currentTheme === "dark" ? darkTheme : lightTheme;
  }, [theme, systemTheme]);

  console.log(systemTheme)

  useEffect(() => {
    const laodUserUnits = async () => {
      try {
        const dataUnits = await Storage.getItem({ key: STORAGE_KEY_U });
        if (dataUnits) {
          SetUnits(dataUnits);
        } else {
          SetUnits("metric");
        }
      } catch (err) {
        console.log(err);
      }
    };
    laodUserUnits();
  }, []);

  useEffect(() => {
    const saveUnits = async () => {
      try {
        await Storage.setItem({
          key: STORAGE_KEY_U,
          value: units,
        });
      } catch (err) {
        console.log(err);
      }
    };
    saveUnits();
  }, [units]);

  useEffect(() => {
    const laodUserTheme = async () => {
      try {
        const dataTheme = await Storage.getItem({ key: STORAGE_KEY_T });
        if (dataTheme) {
          setTheme(dataTheme);
        } else {
          setTheme("dark");
        }
      } catch (err) {
        console.log(err);
      }
    };
    laodUserTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await Storage.setItem({
          key: STORAGE_KEY_T,
          value: theme,
        });
      } catch (err) {
        console.log(err);
      }
    };
    saveTheme();
  }, [theme]);

  return (
    <SettingsData.Provider
      value={{
        units,
        SetUnits,
        theme,
        setTheme,
        themeColors,
        systemTheme,
      }}
    >
      {children}
    </SettingsData.Provider>
  );
};
