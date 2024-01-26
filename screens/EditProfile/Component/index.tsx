import * as React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Image } from "../../../components/Basic/Image";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "../../../components/Basic/TextInput";
import { Button } from "../../../components/Basic/Button/Button";
import { useEffect, useState } from "react";
import { pburl } from "../../../utils/pocketbase";
import { useNavigation } from "@react-navigation/native";
import { EditProfileScreenNavigationProp } from "../types";
import { User, updateProfile } from "firebase/auth";
import { auth } from "../../../hooks/firebaseconfig";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { getUserData } from "../../../utils/asyncStorage";
import { useTheme } from "../../../utils/ThemProvider";
import { dark, light } from "./styles";
import { getDatabase, ref as dbref, push, set, get } from "firebase/database";

export interface IEditProfileProps {
  email: string;
  username: string;
  avatar: string;
  id: string;
}

const EditProfileComponent = (props: IEditProfileProps) => {
  const [username, setUsername] = useState(props.username);
  const [useremail, setUserEmail] = useState(props.email);
  const [user, setUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(props.avatar);
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const { isDarkTheme } = useTheme();

  const openImagePickerAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };
  const handleSubmit = async () => {
    const userId = props.id;
    try {
      console.log(user);

      const db = getDatabase();
      const userDocRef = dbref(db, `users/${userId}`);

      const storage = getStorage();
      const fileref = `profile_images/${Date.now()}.jpg`;
      const storageRef = ref(storage, fileref);

      const response = await fetch(selectedImage);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      try {
        // Get the current data of the user
        const userSnapshot = await get(userDocRef);

        if (userSnapshot.exists()) {
          // Update the user data with the new data
          await set(userDocRef, {
            ...userSnapshot.val(), // Merge existing data
            image: downloadURL,
            displayName: username,
          });
          Alert.alert("Sucess", "User data updated successfully!");
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error updating user data:", error);
      }

      navigation.navigate("Settings");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={isDarkTheme ? dark.topContainer : light.topContainer}>
        <View style={{ marginBottom: 10, paddingBottom: 10 }}>
          {selectedImage == "" ? (
            <Image
              style={isDarkTheme ? dark.profilePicture : light.profilePicture}
              source={require("../../../assets/images/def.jpg")}
            />
          ) : (
            <Image
              style={isDarkTheme ? dark.profilePicture : light.profilePicture}
              source={{
                uri: `${selectedImage}`,
              }}
            />
          )}

          <Icon
            name="camera"
            style={isDarkTheme ? dark.cameraicon : light.cameraicon}
            size={25}
            onPress={openImagePickerAsync}
          />
        </View>
        <Text style={isDarkTheme ? dark.label : light.label}>
          {props.email}
        </Text>
        <View style={isDarkTheme ? dark.inputcontainer : light.inputcontainer}>
          {/* <View style={isDarkTheme ? dark.inputFild : light.inputFild}> */}

          {/* <Text>{props.email}</> */}

          <View style={isDarkTheme ? dark.inputFild : light.inputFild}>
            <Text style={isDarkTheme ? dark.label : light.label}>Username</Text>
            <TextInput
              style={isDarkTheme ? dark.input : light.input}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          <Button
            style={isDarkTheme ? dark.editButton : light.editButton}
            onPress={handleSubmit}
          >
            <Text style={isDarkTheme ? dark.buttonlabel : light.buttonlabel}>
              Save Changes
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default EditProfileComponent;
