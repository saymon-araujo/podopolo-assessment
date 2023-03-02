import { StatusBar } from "react-native";
import {
  useFonts,
  Lato_400Regular,
  Lato_300Light,
  Lato_700Bold,
  Lato_900Black,
} from "@expo-google-fonts/lato";

import Test from "./src/pages/test";

export default function App() {
  const [fontsLoaded] = useFonts({
    light: Lato_300Light,
    regular: Lato_400Regular,
    medium: Lato_700Bold,
    bold: Lato_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
      <Test />
    </>
  );
}
