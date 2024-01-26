// LoadingScreen.js
import React from "react";
import { View, Image, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Your loading image or indicator goes here */}
      <Image
        source={require("../assets/images/splash.png")}
        style={styles.loadingImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  loadingImage: {
    width: "100%",
    height: "100%",
  },
});

export default LoadingScreen;
