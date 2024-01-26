import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "../Basic/Button/Button";
import { Image } from "../Basic/Image";
import { ScrollView } from "react-native-gesture-handler";

export interface IAppProps {}

const ProfileButton = (props: IAppProps) => {
  return (
    <View >
        <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={styles.topbar}>
      <Button>
        <Image
          width={70}
          height={70}
          borderRadius={10000}
          style={{
            borderColor: "#fff",
            borderWidth: 3,
            margin: 10,
          }}
          source={require("../../assets/images/images.jpeg")}
        />
      </Button>
      <Button>
        <Image
          width={70}
          height={70}
          borderRadius={10000}
          style={{
            borderColor: "#fff",
            borderWidth: 3,
            margin: 10,
          }}
          source={require("../../assets/images/images.jpeg")}
        />
      </Button>
      <Button>
        <Image
          width={70}
          height={70}
          borderRadius={10000}
          style={{
            borderColor: "#fff",
            borderWidth: 3,
            margin: 10,
          }}
          source={require("../../assets/images/images.jpeg")}
        />
      </Button>
      <Button>
        <Image
          width={70}
          height={70}
          borderRadius={10000}
          style={{
            borderColor: "#fff",
            borderWidth: 3,
            margin: 10,
          }}
          source={require("../../assets/images/images.jpeg")}
        />
      </Button>
      <Button>
        <Image
          width={70}
          height={70}
          borderRadius={10000}
          style={{
            borderColor: "#fff",
            borderWidth: 3,
            margin: 10,
          }}
          source={require("../../assets/images/images.jpeg")}
        />
      </Button>
      <Button>
        <Image
          width={70}
          height={70}
          borderRadius={10000}
          style={{
            borderColor: "#fff",
            borderWidth: 3,
            margin: 10,
          }}
          source={require("../../assets/images/images.jpeg")}
        />
      </Button>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
  },
  topbar: {
    marginTop: 5,
    borderColor: "#fff",
    backgroundColor: "#fff",
    width: "100%",
    height: "20%",
    flexDirection: "row",
    overflow:'hidden',
    
  },
});

export default ProfileButton;
