import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Feather";
import Iconsetting from "react-native-vector-icons/MaterialIcons";
import PostIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  AouthStack,
  HomeStack,
  NotificationStack,
  PostStack,
  SettingStack,
} from "./Stacks";
import { Badge } from "react-native-elements";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { usePocket } from "../hooks/POcketContext";
import { useTheme } from "../utils/ThemProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../hooks/firebaseconfig";
import { getNotificationsForPost } from "../screens/Notification/getNotifications";
import { IUserData } from "../screens/Profile";
import Notification from "../screens/Notification";

const Tab = createMaterialBottomTabNavigator();
const Tabs = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const { isDarkTheme } = useTheme();
  const [count, setCount] = useState<any>();
  const [user, setUser] = useState<any>();
  const [isloading, setIsLoading] = useState(false);

 //  Define a callback function to refresh count
  const refreshCount = async () => {
    const userId = user?.uid;
    const fetchedNotifications = await getNotificationsForPost(userId);
    setCount(fetchedNotifications.length);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Call the refreshCount function when the user changes
    if (user) {
      refreshCount();
    }
  }, [user]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#053b10"
      inactiveColor="#617ead"
      barStyle={{ backgroundColor: isDarkTheme ? "#9BBEC8" : "#fff" }}
    >
      <Tab.Screen
        name="Home_tab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Post_tab"
        component={PostStack}
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ color }) => (
            <PostIcon name="image-plus" color={color} size={25} />
          ),
        }}
      />
    <Tab.Screen
        name="Notifications-tab"
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="bell" color={color} size={25}></Icon>

              {count ? (
                <Badge
                  value={count}
                  status="error"
                  containerStyle={{ position: "absolute", top: -4, right: -4 }}
                />
              ) : null}
            </View>
          ),
        }}
      >
        {() => <NotificationStack refreshCount={refreshCount} />}
      </Tab.Screen>

      <Tab.Screen
        name="settings_tab"
        component={SettingStack}
        options={{
          tabBarLabel: "settings",
          tabBarIcon: ({ color }) => (
            <Iconsetting name="settings" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
