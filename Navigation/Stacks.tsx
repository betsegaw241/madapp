import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import PostDetails from "../screens/PostDetails/PostDetails";
import Home from "../screens/Home/index";
import Post from "../screens/Post/Post";
import Profile from "../screens/Profile/index";
import Notification from "../screens/Notification/index";
import { MyReactNativeForm } from "../screens/Registration/registration";
import { LoginScreen } from "../screens/login/login";
import { FogetPassword } from "../screens/login/ForgetPassword";
import EditProfile from "../screens/EditProfile/EditProfile";
import Settings from "../screens/Settings/components/SettingComponent";
import { useTheme } from "../utils/ThemProvider";
import { TouchableOpacity } from "react-native";
import SearchScreen from "../screens/Search/SearchScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AboutPage from "../screens/About/About";

const Stack = createStackNavigator();

export const HomeStack = () => {
  const { isDarkTheme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: isDarkTheme ? "#9BBEC8" : "#fff" },
        headerTintColor: isDarkTheme ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Home",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 30 }}
              onPress={() => navigation.navigate("SearchScreen")}
            >
              <FontAwesome
                name="search"
                size={24}
                color={isDarkTheme ? "#fff" : "#999999"}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen name="PostDetails" component={PostDetails} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export const AouthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="login"
    >
      <Stack.Screen name="register" component={MyReactNativeForm} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="forget" component={FogetPassword} />
    </Stack.Navigator>
  );
};

export const PostStack = () => {
  const { isDarkTheme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: isDarkTheme ? "#9BBEC8" : "#fff" },
        headerTintColor: isDarkTheme ? "#fff" : "#000",
      }}
    >
      <Stack.Screen name="Post Event" component={Post} />
    </Stack.Navigator>
  );
};
export const NotificationStack = ({ refreshCount }:any) => {
  const { isDarkTheme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: isDarkTheme ? "#9BBEC8" : "#fff" },
        headerTintColor: isDarkTheme ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="Notifications"
        component={(props: any) => (
          <Notification {...props} refreshCount={refreshCount} />
        )}
      />
    </Stack.Navigator>
  );
};

export const SettingStack = () => {
  const { isDarkTheme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: isDarkTheme ? "#9BBEC8" : "#fff" },
        headerTintColor: isDarkTheme ? "#fff" : "#000",
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="About" component={AboutPage} />
    </Stack.Navigator>
  );
};
