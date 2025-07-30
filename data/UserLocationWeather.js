import { createContext, useContext, useState, useEffect } from "react";
import { Storage } from "expo-storage"; // *** tu dołożyłem kurwa ***
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
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Musisz przyznać pozwolenie, kurwa!");
      return false;
    }
    return true;
  };

  const getUserLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();

    setUserLocation({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
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
        console.log( err);
      }
    };
    loadUserLocation();
  }, []);

  useEffect(() => {
    const saveUserLocation = async () => {
      try {
        if (userLocation) {
          await Storage.setItem({
            key: STORAGE_KEY,
            value: JSON.stringify(userLocation),
          });
        }
      } catch (err) {
        console.log( err);
      }
    };
    saveUserLocation();
  }, [userLocation]);

  return (
    <UserLocationContext.Provider value={{ userLocation,setUserLocation, getUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};
