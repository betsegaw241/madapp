import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Iconsetting from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { IAppProps, SettingScreenNavigationProp } from "../types";
import {
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../hooks/firebaseconfig";
import { IUserData } from "../../Post/types";
import { dark, light } from "./styles";
import { useTheme } from "../../../utils/ThemProvider";
import showAlert from "../../../utils/showAlert";

const Settings = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const [data, setData] = useState<IUserData>({
    email: "",
    displayname: "",
    imageurl: "",
    uid: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userData: IUserData = {
          email: user.email || "",
          displayname: user.displayName || "",
          imageurl: user.photoURL || "",
          uid: user.uid,
        };
        setData(userData);
      } else {
        // No user is signed in
        // Handle the case where the user is not logged in
      }
    });

    return () => unsubscribe();
  }, [data]);

  const handleLogout = async () => {
    setModalVisible(!modalVisible);
    try {
      await signOut(auth);
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.log(error);
    }
  };

  const handlePasswordReset = async () => {
    const email = data.email;
    try {
      const result = await sendPasswordResetEmail(auth, email);
      Alert.alert("", "Password reset instructions sent to your email");
    } catch (error) {
      Alert.alert("Error", `${error}`);
    }
  };

  return (
    <View style={isDarkTheme ? dark.container : light.container}>
      {/* <View style={isDarkTheme ? dark.Separator : light.Separator}></View> */}

      <View style={isDarkTheme ? dark.settingMenu : light.settingMenu}>
        <TouchableOpacity
          style={isDarkTheme ? dark.menuItem : light.menuItem}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text style={isDarkTheme ? dark.menuText : light.menuText}>
            Profile
          </Text>
          <Icon
            style={isDarkTheme ? dark.menuItemIcon : light.menuItemIcon}
            name="navigate-next"
            color={"black"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={isDarkTheme ? dark.menuItem : light.menuItem}
          onPress={() => {
            navigation.navigate("editProfile");
          }}
        >
          <Text style={isDarkTheme ? dark.menuText : light.menuText}>
            Edit Profile
          </Text>
          <Icon
            style={isDarkTheme ? dark.menuItemIcon : light.menuItemIcon}
            name="navigate-next"
            color={"black"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={isDarkTheme ? dark.menuItem : light.menuItem}
          onPress={() => {
            handlePasswordReset();
          }}
        >
          <Text style={isDarkTheme ? dark.menuText : light.menuText}>
            Change Password
          </Text>
          <Icon
            style={isDarkTheme ? dark.menuItemIcon : light.menuItemIcon}
            name="navigate-next"
            color={"black"}
            size={30}
          />
        </TouchableOpacity>
        <View style={isDarkTheme ? dark.Separator : light.Separator}></View>
        <View style={isDarkTheme ? dark.menuItem : light.menuItem}>
          <Text style={isDarkTheme ? dark.menuText : light.menuText}>
            Dark Mode
          </Text>
          <Switch
            trackColor={{ false: "#000", true: "#ffff" }}
            thumbColor={isDarkTheme ? "#000" : "#fff"}
            onValueChange={toggleTheme}
            value={isDarkTheme}
            style={isDarkTheme ? dark.togglebtn : light.togglebtn}
          ></Switch>
        </View>
        <TouchableOpacity style={isDarkTheme ? dark.menuItem : light.menuItem} onPress={()=>navigation.navigate('About')}>
          <Text style={isDarkTheme ? dark.menuText : light.menuText}>
            About
          </Text>
        </TouchableOpacity>
        <View style={isDarkTheme ? dark.Separator : light.Separator}></View>

        <TouchableOpacity
          style={isDarkTheme ? dark.menuItemLogout : light.menuItemLogout}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Iconsetting
            name="logout"
            color={isDarkTheme ? "white" : "black"}
            size={30}
          />
          <Text style={isDarkTheme ? dark.menuText : light.menuText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View style={isDarkTheme ? dark.centeredView : light.centeredView}>
              <View style={isDarkTheme ? dark.modalView : light.modalView}>
                <Text style={isDarkTheme ? dark.modalText : light.modalText}>
                  Are you sure you want to logout?
                </Text>
                <View style={light.modalBtns}>
                  <Pressable
                    style={[
                      isDarkTheme ? dark.button : light.button,
                      isDarkTheme ? dark.buttonClose : light.buttonClose,
                    ]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text
                      style={isDarkTheme ? dark.textStyle : light.textStyle}
                    >
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      isDarkTheme ? dark.button : light.button,
                      isDarkTheme ? dark.buttonLogout : light.buttonLogout,
                    ]}
                    onPress={() => {
                      handleLogout();
                    }}
                  >
                    <Text
                      style={isDarkTheme ? dark.textStyle : light.textStyle}
                    >
                      Logout
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

export default Settings;
