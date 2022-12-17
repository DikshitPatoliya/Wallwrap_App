import { Image, ImageBackground, NativeModules, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { imagePath } from '../utils/ImagePath';
import { fonts } from '../utils/fontsPath';
import { useNavigation, useRoute } from '@react-navigation/native';
import WallpaperManager, {TYPE} from "react-native-wallpaper-manage";

const FullScreenImage = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();

  const setWallpaper = async() => {
    const result = await WallpaperManager.setWallpaper(routes?.params?.url, TYPE.FLAG_SYSTEM)
    console.log("result",result)
  }

  return (
    <ImageBackground  source={{ uri: routes?.params?.url }} style={[styles.container, { paddingTop: top + hp(2) }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={imagePath.backArrow} style={styles.backArrow} />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={{marginRight:wp(4)}}>
          <View style={styles.bottom}>
            <Image source={imagePath.arrowCircle} style={styles.backArrow} />
          </View>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => setWallpaper()}>
          <View style={styles.bottom}>
            <Image source={imagePath.edit} style={styles.backArrow} />
          </View>
          <Text  style={styles.text}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default FullScreenImage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(5)
  },
  backArrow: {
    width: wp(8),
    height: wp(8),
    resizeMode: 'contain'
  },
  bottom: {
    backgroundColor: colors.black,
    borderRadius: wp(2),
    alignSelf: "flex-start",
    padding: wp(3),
  },
  mainContainer: {
    flexDirection: 'row',
    alignSelf: "center",
    bottom: hp(5),
    position: "absolute"
  },
  text: {
    fontFamily:fonts.SEMIBOLD,
    color:colors.white,
    alignSelf:'center'
  }
})