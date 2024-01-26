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
import { IRprops, RegisterScreenNavigationProp } from "./types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../hooks/firebaseconfig";

const Register = (props: IRprops) => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const createUser = async () => {
    if (password === conformPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
const docRef = setDoc(doc(database,'user',userCredential.user.uid),{
  
})

          const user = userCredential.user;
          navigation.navigate("login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          // ..
        });
    } else {
      setEmail("Email and Conform Email should be same");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputFilds}>
        <Text style={styles.title}>Welcome to Event Post</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUserName}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#F9FBF9",
            borderRadius: 8,
            marginBottom: 12,
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#F9FBF9",
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              marginRight: 10,
              padding: 10,
            }}
            placeholder="Conform Password"
            value={conformPassword}
            onChangeText={setConformPassword}
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

        <Button onPress={createUser} style={styles.button}>
          <Text style={{ fontSize: 20 }}>Signup</Text>
        </Button>

        <Text style={styles.icontext}>or sign up with</Text>
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
        <Text>Already have an account?</Text>
        <Text
          style={{
            paddingBottom: 5,
            color: "#34dd",
            fontWeight: "bold",
          }}
          onPress={() => {
            navigation.navigate("login");
          }}
        >
          Login
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
  },
  inputFilds: {
    width: "80%",
    gap: 5,
  },
  input: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "#F9FBF9",
    marginBottom: 12,
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

export default Register;
