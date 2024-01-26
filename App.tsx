import { StyleSheet } from "react-native";
import FontLoader from "./utils/fonts";
import Auth from "./Navigation/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./utils/ThemProvider";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <FontLoader>
          {(fontsLoaded) => (fontsLoaded ? <Auth /> : null)}
        </FontLoader>
      </ThemeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
