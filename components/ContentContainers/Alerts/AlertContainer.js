import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import useFetch from "../../../hooks/useFetch";
import SkeletonLoader from "./SkeletonLoader";
import { useSettingsDataContext } from "../../../data/SettingsContext";

export default function AlertContainer({ data }) {
  const { lat, lon } = data;

  const { themeColors } = useSettingsDataContext();

  const {
    data: weatherData,
    isPending,
    error,
  } = useFetch(
    `https://api.weatherapi.com/v1/alerts.json?key=abbd9e65a1874f3088082052252507&q=${lat},${lon}&lang=en`
  );

  if (isPending) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const alerts = weatherData?.alerts?.alert || [];

  const formatAlertDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const iso = date.toISOString(); 
    const [day, time] = iso.split("T"); 
    const hoursMinutes = time.slice(0, 5); 
    return `${day} ${hoursMinutes}`;
  };

  if (alerts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={[{ color: themeColors.textColor, fontSize: 20 }]}>
          No active weather alerts.
        </Text>
        <Text
          style={[
            styles.italicText,
            { color: themeColors.textColor, fontSize: 20 },
          ]}
        >
          "don't worry be happy"
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {alerts.map((alertItem, index) => (
        <View
          key={index}
          style={[styles.alertCard, { borderColor: themeColors.textColor }]}
        >
          <Text style={[styles.title, { color: themeColors.textColor }]}>
            {alertItem.headline}
          </Text>

          <View style={styles.col}>
            <View style={styles.item}>
              <Text
                style={{ color: themeColors.textColor, fontWeight: "bold" }}
              >
                Agency:
              </Text>
              <Text style={{ color: themeColors.textColor }}>
                {alertItem.sender_name || "Unknown"}
              </Text>
            </View>
            <View style={styles.item}>
              <Text
                style={{ color: themeColors.textColor, fontWeight: "bold" }}
              >
                Start:
              </Text>
              <Text style={{ color: themeColors.textColor }}>
                {formatAlertDate(alertItem.effective)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text
                style={{ color: themeColors.textColor, fontWeight: "bold" }}
              >
                End:
              </Text>
              <Text style={{ color: themeColors.textColor }}>
                {formatAlertDate(alertItem.expires)}
              </Text>
            </View>
          </View>

          <Text style={[styles.description, { color: themeColors.textColor }]}>
            {alertItem.desc}
          </Text>
          <Text style={[styles.italicText, { color: themeColors.textColor }]}>
            "{alertItem.instruction}"
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alertCard: {
    padding: 15,
    flex: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  col: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap:1
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    marginTop: 5,
    textAlign: "center",
  },
  italicText: {
    marginTop: 5,
    textAlign: "justify",
    fontStyle: "italic",
  },
});
