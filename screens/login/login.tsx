// Formik x React Native example
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Dimensions
} from "react-native";
import { Formik } from "formik";
import { signInSchema } from "./schema";

import { Box } from "../../components/Basic/Box";
import { Text } from "../../components/Basic/Text";
import { TextInput } from "../../components/Basic/TextInput";
import { Button } from "../../components/Basic/Button";
import { Image } from "../../components/Basic/Image";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "./types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../hooks/firebaseconfig";

export let initialValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export const LoginScreen = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);

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
          validationSchema={signInSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSignup(values, setSubmitting, setIsSigningIn);
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
                <Text color="#06739b" fontWeight={'bold'} fontSize={25}>
                  Login
                </Text>
                {/* <Divider width={'58%'} /> */}
              </Box>
              <Text fontSize={16} alignSelf="flex-start">
                Email Address
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

              <Button
                backgroundColor={isSigningIn ? "#06739b" : "#06739b"}
                onPress={() => {
                  // setIsSigning(true);
                  props.handleSubmit();
                }}
                borderRadius={10}
                mt={2}
                disabled={isSigningIn}
              >
                <Text
                  textAlign="center"
                  color="white"
                  fontSize={18}
                  padding={13}
                >
                  {isSigningIn ? (
                    <ActivityIndicator size="small" color="Green" />
                  ) : (
                    "Login"
                  )}
                </Text>
              </Button>
              <Text textAlign="center" mt={2} fontSize={15}>
               
                <TouchableWithoutFeedback 
                  onPress={() => {
                    navigation.navigate("forget");
                  }}
                >
                  <Text color="#06739b">Forget Password?</Text>
                </TouchableWithoutFeedback>
              </Text> 
              <Text textAlign="center" my={1} fontSize={15}>
                you don't have an account?
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("register");
                  }}
                >
                  <Text color="#06739b">SingUp</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function handleSignup(
  values: any,
  setSubmitting: (isSubmitting: boolean) => void,
  setIsSigningIn: (isSignedUp: boolean) => void
) {
  const { email, password } = values;
  setIsSigningIn(true)
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert('Error',errorCode);
    })
    .finally(() => {
      setIsSigningIn(false); 
      setSubmitting(false);
    });
}
