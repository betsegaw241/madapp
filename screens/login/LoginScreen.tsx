import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "../../components/Basic/Button/Button";
import { Image } from "../../components/Basic/Image";
import { useNavigation } from "@react-navigation/native";
import { client } from "../../utils/pocketbase";
import { storeUserData } from "../../utils/asyncStorage";
import { LoginScreenNavigationProp } from "./types";
import {usePocket} from '../../hooks/POcketContext';
import { useFirebase } from "../../hooks/firebaseContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app ,auth} from "../../hooks/firebaseconfig";

// const auth = getAuth(app);a
export interface IAppProps {}

const LoginScreen = (props: IAppProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login } = usePocket();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(null);


  const handleLogin =  () => {
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user, "signed in successfully");
          navigation.navigate('Home');
          // You may want to redirect or perform other actions upon successful login
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          setError(errorMessage);
          navigation.navigate('register');

        });
   
    };
  return (
    <View style={styles.container}>
      <View style={styles.inputFilds}>
        <Text style={styles.title}>Welcome back! Glad to see you,Again!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#F9FBF9",
            borderRadius: 8,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              marginRight: 10,
              padding: 10,
            }}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={15}
              color="black"
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={styles.forget}
          onPress={() => {
            navigation.navigate("forget");
          }}
        >
          Forget password?
        </Text>
        <Button onPress={handleLogin} style={styles.button}>
          <Text style={{ fontSize: 20 }}>Login</Text>
        </Button>

        <Text style={styles.icontext}>or Login with</Text>
        <View style={styles.iconbtns}>
          <Button>
            {
              <Image
                width={40}
                height={40}
                source={require("../../assets/images/google.png")}
              />
            }
          </Button>
          <Button>
            {
              <Image
                width={40}
                height={40}
                source={require("../../assets/images/facebook.png")}
              />
            }
          </Button>
          <Button>
            {
              <Image
                width={40}
                height={40}
                source={require("../../assets/images/linkedin.png")}
              />
            }
          </Button>
        </View>
      </View>
      <View style={styles.bottomtext}>
        <Text>Dont't have an account?</Text>
        <Text
          style={{
            paddingBottom: 5,
            color: "#34dd",
            fontWeight: "bold",
          }}
          onPress={() => {
            navigation.navigate("register");
          }}
        >
          Register Now
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    flexDirection: "column",
  },
  title: {
    fontSize: 25,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "500",
    color: "#34dd",
    fontFamily: "NovaSquare-Regular",
  },
  inputFilds: {
    width: "80%",
    gap: 5,
  },
  input: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "#F9FBF9",
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#34dd",
    alignItems: "center",
    borderRadius: 8,
  },
  forget: {
    textAlign: "right",
    paddingBottom: 5,
    color: "#34dd",
    fontWeight: "bold",
  },
  iconbtns: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icontext: {
    textAlign: "center",
    padding: 15,
  },
  bottomtext: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20%",
  },
});

export default LoginScreen;
