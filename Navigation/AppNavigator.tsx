// AppNavigator.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Auth from "./Auth";
import Home from "../screens/Home/index";
import PostDetails from "../screens/PostDetails/PostDetails";
import Post from "../screens/Post/Post";
import Profile from "../screens/Profile/index";
import Notification from "../screens/Notification/index";
import Register from "../screens/Registration/Register";
import LoginScreen from "../screens/login/LoginScreen";
import ForgetPassword from "../screens/login/ForgetPassword";
import EditProfile from "../screens/EditProfile/EditProfile";
import Settings from "../screens/Settings";
import Icon from "react-native-vector-icons/FontAwesome";
import PostIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Badge } from "react-native-elements";
import { View } from "react-native";
import { usePocket } from "../hooks/POcketContext";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="PostDetails" component={PostDetails} />
  </Stack.Navigator>
);

const PostStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Post Event" component={Post} />
  </Stack.Navigator>
);

const NotificationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Notifications" component={Notification} />
  </Stack.Navigator>
);

const SettingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="editProfile" component={EditProfile} />
  </Stack.Navigator>
);

const Tabs = () => (
  <Tab.Navigator
  initialRouteName="Home"
  activeColor="#053b10"
  inactiveColor="#617ead"
  barStyle={{ backgroundColor: "#ffff" }}
   
  >
    <Tab.Screen
      name="Home_tab"
      component={HomeStack}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={25} />,
      }}
    />
    <Tab.Screen
      name="Post_tab"
      component={PostStack}
      options={{
        tabBarLabel: "Post",
        tabBarIcon: ({ color }) => <PostIcon name="image-plus" color={color} size={25} />,
      }}
    />
    <Tab.Screen
      name="Notifications-tab"
      component={NotificationStack}
      options={{
        tabBarLabel: "Notifications",
        tabBarIcon: ({ color }) => (
          <View>
            <Icon name="bell" color={color} size={25} />
            <Badge
              value="3"
              status="error"
              containerStyle={{ position: "absolute", top: -4, right: -4 }}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="settings_tab"
      component={SettingStack}
      options={{
        tabBarLabel: "Settings",
        tabBarIcon: ({ color }) => <Icon name="cog" color={color} size={25} />,
      }}
    />
  </Tab.Navigator>
);

const AuthNavigator = () => {
  const { pb } = usePocket();

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {pb.authStore.isValid ? (
        <Stack.Screen name="Home_tab" component={Tabs} />
      ) : (
        <>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </>
      )}
    </Stack.Navigator>
    </NavigationContainer>
  );
};


export default AuthNavigator;
