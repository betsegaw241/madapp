import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../../components/Card";
import ProfileButton from "../../../components/ProfileButton";
import { IParsedData } from "../../../components/Card/types";

const Stack = createStackNavigator();

{
  /* <View style={{justifyContent:'center',alignItems:'center',marginTop:'50%'}}>
          <ActivityIndicator size={'large'} color='#0000ff'/>
        </View> */
}

const HomeComponent = (props: any) => {
  const navigation = useNavigation();
  const items = props.data || [];

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", width: "100%" }}
    >
      {/* <ProfileButton/>
       */}

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={({ item, index }) => (
          <Card {...item} key={index.toString()} />
        )}
      />

      {/* <Text onPress={() => {navigation.navigate('PostDetails')}}>home</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
  },
});

export default HomeComponent;
