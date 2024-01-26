// Formik x React Native example
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Formik } from "formik";
import { signupSchema } from "./schema";

import { Box } from "../../components/Basic/Box";
import { Text } from "../../components/Basic/Text";
import { TextInput } from "../../components/Basic/TextInput";
import { Button } from "../../components/Basic/Button";
import { Image } from "../../components/Basic/Image";
import { useNavigation } from "@react-navigation/native";
import { RegisterScreenNavigationProp } from "./types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../hooks/firebaseconfig";
import { ref as dbref, getDatabase, push, set } from "firebase/database";
import { registerForPushNotificationsAsync } from "../../hooks/RegisterNotification";

export let initialValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export const MyReactNativeForm = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "5%",
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
        style={{ width: "100%" }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSignup(
              values,
              setSubmitting,
              setIsSignedUp,
              setIsSigning,
              navigation
            );
          }}
        >
          {(props) => (
            <View style={{ width: "100%" }}>
              <Box alignSelf="center"></Box>
              <Box
                flexDirection="row"
                alignItems="center"
                mt={10}
                justifyContent={"center"}
              >
                <Image
                  height={100}
                  width={"100%"}
                  source={require("../../assets/images/logo.jpg")}
                ></Image>
              </Box>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <Text color="#06739b" fontWeight={"bold"} fontSize={25}>
                  Register
                </Text>
                {/* <Divider width={'58%'} /> */}
              </Box>
              <Text fontSize={16} alignSelf="flex-start">
                Email
              </Text>
              <TextInput
                borderRadius={10}
                borderWidth={1}
                mt={1}
                fontSize={18}
                padding={2}
                borderColor="#06739b"
                height={45}
                backgroundColor="white"
                placeholder="Email"
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
              />
              <Text color="red">
                {props.touched.email && props.errors.email}
              </Text>
              <Text fontSize={16} alignSelf="flex-start">
                Username
              </Text>
              <TextInput
                borderRadius={10}
                borderWidth={1}
                padding={2}
                mt={1}
                fontSize={18}
                borderColor="#06739b"
                height={45}
                backgroundColor="white"
                placeholder="Name"
                onChangeText={props.handleChange("username")}
                onBlur={props.handleBlur("username")}
              />
              <Text color="red">
                {props.touched.username && props.errors.username}
              </Text>
              <Text fontSize={16} alignSelf="flex-start">
                Password
              </Text>
              <TextInput
                borderRadius={10}
                borderWidth={1}
                mt={1}
                fontSize={18}
                padding={2}
                borderColor="#06739b"
                height={45}
                backgroundColor="white"
                placeholder="Password"
                secureTextEntry
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
              />

              <Text color="red">
                {props.touched.password && props.errors.password}
              </Text>

              <TextInput
                borderRadius={10}
                borderWidth={1}
                mt={1}
                fontSize={18}
                padding={2}
                borderColor="#06739b"
                height={45}
                backgroundColor="white"
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={props.handleChange("confirmPassword")}
                onBlur={props.handleBlur("confirmPassword")}
              />
              <Text color="red">
                {props.touched.confirmPassword && props.errors.confirmPassword}
              </Text>
              <Button
                backgroundColor={isSigning ? "#06739b" : "#06739b"}
                onPress={() => {
                  // setIsSigning(true);
                  props.handleSubmit();
                }}
                borderRadius={10}
                mt={2}
                disabled={isSigning}
              >
                <Text
                  textAlign="center"
                  color="white"
                  fontSize={18}
                  padding={13}
                >
                  {isSigning ? (
                    <ActivityIndicator size="small" color="Green" />
                  ) : (
                    "Register"
                  )}
                </Text>
              </Button>
              <Text textAlign="center" my={3} fontSize={15}>
                Do you have an account?
                <TouchableWithoutFeedback
                  onPress={() => {
                    // setIsSigning(true);
                    navigation.navigate("login");
                  }}
                >
                  <Text color="#06739b">Login</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

async function handleSignup(
  values: any,
  setSubmitting: (isSubmitting: boolean) => void,
  setIsSignedUp: (isSignedUp: boolean) => void,
  setIsSigning: (isSigning: boolean) => void,
  navigation: { navigate: (screen: string) => void }
) {
  const { email, password, username } = values;
  const db = getDatabase();

  setIsSigning(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredential.user.uid;
    const userDocRef = dbref(db, `users/${userId}`);
    await set(userDocRef, {
      uid: userId,
      email: userCredential.user.email,
      displayName: username,
      image: "",
    });
    //   auth.signOut()
    // navigation.navigate('login')
  } catch (error: any) {
    Alert.alert("Error", error.code);
  } finally {
    setIsSigning(false);
    setSubmitting(false);
  }
}
