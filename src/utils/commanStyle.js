import { StyleSheet } from "react-native";
import { wp } from "./responsiveScreen";

export const commanStyle = StyleSheet.create({
  loader: {
    flex: 1,
    position: "absolute",
    zIndex: 999,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  wLogo: {
    width: wp(10),
    height: wp(10),
    alignSelf: "center",
    resizeMode: 'contain'
  }
})