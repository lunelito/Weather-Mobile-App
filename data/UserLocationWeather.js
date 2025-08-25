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
  const [userLocation, setUserLocation] = useState([]);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (!locationPermissionInformation) return false;

    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("you need to give us acces");
      return false;
    }
    return true;
  };

  const getUserLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    try {
      const location = await getCurrentPositionAsync();
      setUserLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
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
          setUserLocation([]);
        }
      } catch (err) {
        console.log(err);
        setUserLocation([]);
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
        console.log(err);
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
