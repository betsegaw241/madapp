import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
// import client from "../..//utils/lib/pocketbase";
import { Image, ImageBackground } from "../../../components/Basic/Image";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "../../../utils/ThemProvider";

export interface IAppProps {
  id: string;
  username: string;
  email: string;
  image: string;
  event: any;
}
type RootStackParamList = {
  editProfile: undefined;
};

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "editProfile"
>;

const ProfileComponent = (props: IAppProps) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { isDarkTheme } = useTheme();
  console.log("props--", !props.event);
  console.log("props--", props.event.length == 0);
  if (props.event.length == 0) {
    return <ActivityIndicator size={"large"} />;
  }
  return (
    <View style={isDarkTheme ? dark.container : light.container}>
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          source={
            props.image
              ? {
                  uri: `${props.image}`,
                }
              : require("../../../assets/images/defcov.jpg")
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              height: 150,
            }}
          ></View>
        </ImageBackground>
        <View style={{ flexDirection: "row" }}>
          <Image
            width={150}
            height={150}
            borderRadius={10000}
            style={isDarkTheme ? dark.profileImage : light.profileImage}
            source={
              props.image
                ? {
                    uri: `${props.image}`,
                  }
                : require("../../../assets/images/def.jpg")
            }
          />

          <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
            <Text
              style={{
                fontSize: 25,
                ...(isDarkTheme ? dark.text : light.text),
              }}
            >
              {props.username}
            </Text>
            <Text
              style={{
                fontSize: 20,
                ...(isDarkTheme ? dark.text : light.text),
              }}
            >
              {props.email}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingHorizontal: "20%",
            marginTop: 25,
          }}
        >
          <Text>Events</Text>
          
        </View>
        <View style={{ borderColor: "#ccc", borderWidth: 1 ,marginHorizontal:'10%',marginTop:5}}></View>
        <View style={light.imagedisplay}>
          {props.event &&
            props.event.map((uri: string, index: number) => (
              <TouchableOpacity
                key={index.toString()}
                // onPress={() => setSelectedImage(uri)}
              >
                <Image
                  style={light.imagi}
                  source={{
                    uri: `${uri}`,
                  }}
                />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const light = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  profileImage: {
    borderColor: "#DDF2FD",
    borderWidth: 10,
    margin: 10,
    marginTop: -20,
  },
  text: {},
  imagedisplay: {
    flexDirection: "row",

    gap: 5,
    flexWrap: "wrap",
    padding: "10%",
  },
  imagi: {
    width: 100,
    height: 200,
    borderRadius: 8,
  },
});
const dark = StyleSheet.create({
  container: {
    backgroundColor: "#164863",
    height: "100%",
  },
  profileImage: {
    borderColor: "#DDF2FD",
    borderWidth: 10,
    margin: 10,
    marginTop: -20,
  },
  text: {
    color: "#fff",
  },
});

export default ProfileComponent;
