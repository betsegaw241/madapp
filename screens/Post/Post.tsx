import React, { useEffect, useState } from "react";
import { Image, ScrollView, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "../../components/Basic/TextInput";
import { Button } from "../../components/Basic/Button/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ref as dbref, getDatabase, push, set } from "firebase/database";
import { auth, storage } from "../../hooks/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { IUserData } from "./types";
import { useTheme } from "../../utils/ThemProvider";

interface ImageData {
  id?: number;
  localUri: string;
}

interface Ierror {
  uri: string;
  name: string;
  date: string;
}

export default function ImageUpload(): JSX.Element {
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const { isDarkTheme } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [displayTime, setDisplayTime] = useState("HH:mm");
  const [displayDate, setDisplayDate] = useState("DD/MM/YYYY");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [user, setUser] = useState<IUserData>();
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData: IUserData = {
          email: user.email || "",
          displayname: user.displayName || "",
          imageurl: user.photoURL || "",
          uid: user.uid,
        };
        setUser(userData);
      } else {
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowTimePicker(false);
    setShowDatePicker(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDisplayDate(currentDate.toLocaleDateString());
  };

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);
    setShowDatePicker(false);
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setDisplayTime(currentTime.toLocaleTimeString());
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      // Map the selected assets to an array of objects with localUri property
      const selectedImagesArray = pickerResult.assets.map((asset) => ({
        localUri: asset.uri,
      }));

      // Update the state with the new array of selected images
      setSelectedImages([...selectedImages, ...selectedImagesArray]);
    }
  };

  const uploadImages = async (imageUris: string[]) => {
    // const storage = getStorage();
    const imageUrls = [];

    // Loop through the array of image URIs
    try {
      // Loop through the array of image URIs
      for (const imageUri of imageUris) {
        // Create a reference to the storage location
        const imageRef = `events/${Date.now()}.jpg`;
        const storageRef = ref(storage, imageRef);

        // Convert the image to a Blob
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Upload the Blob to Firebase Storage
        await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Save the download URL in the array
        imageUrls.push(downloadURL);
      }

      // Save the array of image URLs in the Realtime Database
    } catch (error) {
      console.error("Error uploading images: ", error);
    }

    return imageUrls;
  };

  const handleSubmit = async () => {
    const formattedDateTime = `${date.toISOString().split("T")[0]} ${
      time.toLocaleTimeString().split(" ")[0]
    }`;

    const db = getDatabase();

    if (validateForm()) {
      try {
        const uploadedImageUrls = await uploadImages(
          selectedImages.map((image) => image.localUri)
        );

        const eventsRef = dbref(db, "events");

        // Create a new child node with a unique key
        const newEventRef = push(eventsRef);
        // Set the data for the new event
        // Use push to generate a unique ID

        const id = newEventRef.key;

        await set(newEventRef, {
          id,
          title,
          description,
          location,
          date: formattedDateTime,
          imageUrls: uploadedImageUrls,
          userId: user?.uid,
          avatar: user?.imageurl,
          username: user?.displayname,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error("Error handling the submission:", error);
      }

      setTitle("");
      setDescription("");
      setLocation("");
      setDisplayDate("DD/MM/YYYY");
      setDisplayTime("HH:mm");

      setSelectedImages([]);
    }
  };

  const validateForm = () => {
    let errors: any = {};

    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    if (displayDate == "DD/MM/YYYY") errors.date = "Date is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const selectedStyles = isDarkTheme ? darkselectedStyles : baseselectedStyles;

  return (
    <ScrollView
      style={selectedStyles.container}
      showsVerticalScrollIndicator={false}
    >
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          maximumDate={Date.now()}
          onChange={(event, selectedDate) => onChangeDate(event, selectedDate)}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => onChangeTime(event, selectedTime)}
        />
      )}

      <View style={selectedStyles.container2}>
        <View>
          <Text style={selectedStyles.headertitle}>Create Event</Text>
        </View>

        <TextInput
          multiline={true}
          placeholder="Title"
          numberOfLines={2}
          value={title}
          onChangeText={setTitle}
          style={selectedStyles.input}
        />
        {errors.title ? (
          <Text style={selectedStyles.errorText}>{errors.title}</Text>
        ) : null}
        <View style={selectedStyles.inputContainer}>
          <TextInput
            placeholder={"DD/MM/YYYY"}
            value={displayDate}
            style={{
              width: "90%",
              ...(isDarkTheme ? { color: "#fff" } : null),
            }}
            onFocus={showDateTimePicker}
          />
          <Icon
            name="calendar-month-outline"
            color={"#8a8a8a"}
            size={35}
            onPress={showDateTimePicker}
          />
        </View>
        {errors.date ? (
          <Text style={selectedStyles.errorText}>{errors.date}</Text>
        ) : null}

        <View style={selectedStyles.inputContainer}>
          <TextInput
            placeholder={"HH:mm"}
            editable={true}
            value={displayTime}
            style={{
              width: "90%",
              ...(isDarkTheme ? { color: "#fff" } : null),
            }}
            onFocus={() => setShowTimePicker(true)}
          />
          <Icon
            name="clock-time-three-outline"
            color={"#8a8a8a"}
            size={35}
            onPress={() => setShowTimePicker(true)}
          />
        </View>

        <TextInput
          multiline={true}
          placeholder="Location"
          numberOfLines={2}
          value={location}
          onChangeText={setLocation}
          style={selectedStyles.input}
        />

        <TextInput
          multiline={true}
          placeholder="enter event description here"
          numberOfLines={100}
          value={description}
          onChangeText={setDescription}
          style={selectedStyles.descriptionInput}
        />
        {errors.description ? (
          <Text style={selectedStyles.errorText}>{errors.description}</Text>
        ) : null}

        <View style={selectedStyles.imageContainer}>
          {selectedImages.map((image) => (
            <Image
              key={image.id}
              source={{ uri: image.localUri }}
              style={selectedStyles.thumbnail}
            />
          ))}
        </View>

        <View style={selectedStyles.uploadbuttonContainer}>
          <Text style={selectedStyles.uploadlabel}>
            Choose image to upload:
          </Text>

          <Button
            style={selectedStyles.uploadbutton}
            onPress={openImagePickerAsync}
          >
            <Text style={selectedStyles.uploadlabel}>select image </Text>
          </Button>
        </View>

        <Button style={selectedStyles.postbutton} onPress={handleSubmit}>
          <Text style={selectedStyles.postbuttonlabel}>Post event</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const baseselectedStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 50,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    margin: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 24,
    marginRight: 8, // Add margin for better spacing
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 20,
  },
  descriptionInput: {
    height: 150,
    width: "90%",
    borderColor: "#b1e8e8",
    // backgroundColor: "#f1f5f5",
    borderWidth: 1,
    padding: 8,
    textAlignVertical: "top",
    fontSize: 16,
    borderRadius: 8,
  },
  input: {
    width: "90%",
    borderColor: "#b1e8e8",
    // backgroundColor: "#f1f5f5",
    borderWidth: 1,
    padding: 8,

    fontSize: 16,
    borderRadius: 8,
  },
  headertitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  uploadbuttonContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "85%",
  },
  uploadbutton: {
    padding: 10,
    height: 50,
    borderColor: "#06739b",
    borderWidth: 1,
    // backgroundColor: "#f1f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  uploadlabel: {
    fontSize: 18,
  },
  postbutton: {
    width: "90%",
    height: 60,
    backgroundColor: "#06739b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 50,
  },
  postbuttonlabel: {
    fontSize: 25,
    color: "#fff",
  },
  inputContainer: {
    width: "90%",
    borderColor: "#b1e8e8",
    // backgroundColor: "#f1f5f5",
    borderWidth: 1,
    padding: 8,

    fontSize: 16,
    borderRadius: 8,
    flexDirection: "row",
  },
  errorText: {
    color: "red",
    padding: 0,
    margin: 0,
  },
});
const darkselectedStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 50,
    backgroundColor: "#06739b",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 24,
    marginRight: 8,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 20,
  },
  descriptionInput: {
    height: 150,
    width: "90%",
    borderColor: "#b1e8e8",
    color: "#fff",
    borderWidth: 1,
    padding: 8,
    textAlignVertical: "top",
    fontSize: 16,
    borderRadius: 8,
  },
  input: {
    width: "90%",
    borderColor: "#b1e8e8",
    // backgroundColor: "#f1f5f5",
    borderWidth: 1,
    padding: 8,
    color: "#fff",
    fontSize: 16,
    borderRadius: 8,
  },
  headertitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  uploadbuttonContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
  },
  uploadbutton: {
    padding: 10,
    height: 50,
    borderColor: "#DDF2FD",
    borderWidth: 1,
    // backgroundColor: "#f1f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  uploadlabel: {
    fontSize: 18,
    color: "#fff",
  },
  postbutton: {
    width: "90%",
    height: 60,
    backgroundColor: "#06739b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 50,
  },
  postbuttonlabel: {
    fontSize: 25,
  },
  inputContainer: {
    width: "90%",
    borderColor: "#b1e8e8",
    // backgroundColor: "#f1f5f5",
    borderWidth: 1,
    padding: 8,

    fontSize: 16,
    borderRadius: 8,
    flexDirection: "row",
  },
  errorText: {
    color: "red",
    padding: 0,
    margin: 0,
  },
});

// Dark theme selectedStyles
