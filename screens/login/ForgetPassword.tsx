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
import { forgetSchema } from "./schema";

import { Box } from "../../components/Basic/Box";
import { Text } from "../../components/Basic/Text";
import { TextInput } from "../../components/Basic/TextInput";
import { Button } from "../../components/Basic/Button";
import { Image } from "../../components/Basic/Image";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "./types";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../hooks/firebaseconfig";

export let initialValues = {
  email: "",
};

export const FogetPassword = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

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
          validationSchema={forgetSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSignup(values, navigation);
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
                <Text fontSize={15}>
                  Enter email address linked with your account
                </Text>
                {/* <Divider width={'58%'} /> */}
              </Box>

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
              <Button
                backgroundColor={"#06739b"}
                onPress={() => {
                  // setIsSigning(true);
                  props.handleSubmit();
                }}
                borderRadius={10}
                mt={1}
              >
                <Text
                  textAlign="center"
                  color="white"
                  fontSize={18}
                  padding={13}
                >
                  Send password Reset Email
                </Text>
              </Button>

              <Text textAlign="center" my={3} fontSize={15}>
                Remember Password?
                <TouchableWithoutFeedback
                // onPress={() => {
                //   // navigation.navigate("login");
                // }}
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

  navigation: { navigate: (screen: string) => void }
) {
  const { email } = values;

  try {
    const result = await sendPasswordResetEmail(auth, email);
    Alert.alert("", "Password reset instructions sent to your email");
    console.log(result);
    navigation.navigate("login");
  } catch (error) {
    Alert.alert("Error", `${error}`);
  }
}
