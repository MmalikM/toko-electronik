import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dummy from "../screen/Dummy";
import Favourite from "../screen/Favourite";
import Home from "../screen/Home";
import Profile from "../screen/Profile";
import MainStack from "./MainStack";

const { Navigator, Screen } = createBottomTabNavigator();

export default function Tab() {
  return (
    <Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Menu") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Favourite") {
              iconName = focused ? "heart-sharp" : "heart-outline";
            } else if (route.name === "Chart") {
              iconName = focused ? "basket-sharp" : "basket-outline";
            } else if (route.name === "Profile") {
              iconName = focused
                ? "person-circle-sharp"
                : "person-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        };
      }}
    >
      <Screen name="Menu" component={MainStack} />
      <Screen name="Favourite" component={Favourite} />
      <Screen name="Chart" component={Dummy} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
