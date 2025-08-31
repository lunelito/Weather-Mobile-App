import { createContext, useContext, useState, useEffect } from "react";
import { Storage } from "expo-storage";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { Alert } from "react-native";

const STORAGE_KEY = "user_locations";

const UserLocationContext = createContext();

export const useUserLocation = () => useContext(UserLocationContext);

export const UserLocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

const verifyPermissions = async () => {
  if (!locationPermissionInformation) return false;

  if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
    Alert.alert(
      "Location needed",
      "We need access to your location to show the weather",
      [
        {
          text: "Nope",
          style: "cancel",
          onPress: () => false,
        },
        {
          text: "Okay",
          onPress: async () => {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
          },
        },
      ]
    );
    return false;
  }

  if (locationPermissionInformation.status === PermissionStatus.DENIED) {
    Alert.alert("you need to give us access");
    return false;
  }

  return true;
};

  const getUserLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    try {
      const location = await getCurrentPositionAsync();
      const newLocation = {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };
      setUserLocation(newLocation);
    } catch (err) {
      console.log(err);
      Alert.alert("Could not get your location");
    }
  };

  useEffect(() => {
    const loadUserLocation = async () => {
      try {
        const data = await Storage.getItem({ key: STORAGE_KEY });
        if (data) {
          setUserLocation(JSON.parse(data));
        } else {
          setUserLocation(null); 
        }
      } catch (err) {
        console.log("loadUserLocation error:", err);
        setUserLocation(null);
      }
    };
    loadUserLocation();
  }, []);

  useEffect(() => {
    const saveUserLocation = async () => {
      try {
        if (userLocation?.lat && userLocation?.lon) {
          await Storage.setItem({
            key: STORAGE_KEY,
            value: JSON.stringify(userLocation),
          });
        }
      } catch (err) {
        console.log("saveUserLocation error:", err);
      }
    };
    saveUserLocation();
  }, [userLocation]);

  return (
    <UserLocationContext.Provider
      value={{ userLocation, setUserLocation, getUserLocation }}
    >
      {children}
    </UserLocationContext.Provider>
  );
};
