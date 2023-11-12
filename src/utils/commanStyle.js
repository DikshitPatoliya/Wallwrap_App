import { StyleSheet } from "react-native";
import { hp, wp } from "./responsiveScreen";

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
  },
  image:{
    width: wp(45),
  height: wp(70),
  marginBottom: hp(1.6),
  borderRadius: wp(3),
  resizeMode: 'cover',
}
})