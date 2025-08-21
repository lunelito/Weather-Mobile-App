import { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import Setting from "./Setting";
import ThemeContainer from "./Settings/ThemeContainer";
import UnitsContainer from "./Settings/UnitsContainer";
import IconButton from "../UI/IconButton";
import { useSettingsDataContext } from "../../data/SettingsContext";

export default function SettingsContainer({ navigation }) {
  const { themeColors } = useSettingsDataContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerStyle: { backgroundColor: themeColors.backgroundColor },
      contentStyle: { backgroundColor: themeColors.secondaryBackgroundColor },
      headerTintColor: themeColors.textColor,
      headerLeft: () => (
        <IconButton
          size={24}
          icon={"arrow-back"}
          color={themeColors.textColor}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation,themeColors]);
  return (
    <View style={{ flex: 1 }}>
      <Setting title="Theme">
        <ThemeContainer />
      </Setting>
      <Setting title="Units">
        <UnitsContainer />
      </Setting>
    </View>
  );
}
