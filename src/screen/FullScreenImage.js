import { ActivityIndicator, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { imagePath } from '../utils/ImagePath';
import { fonts } from '../utils/fontsPath';
import { useNavigation, useRoute } from '@react-navigation/native';
import WallpaperManager, { TYPE } from "react-native-wallpaper-manage";
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'rn-fetch-blob';

const FullScreenImage = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();
  const [loader, setLoader] = useState(false);
  
  const setLockWallpaper = async () => {
    const result = await WallpaperManager.setWallpaper(routes?.params?.url, TYPE.FLAG_LOCK)
    console.log("result", result)
  }

  const setHomeWallpaper = async () => {
    const result = await WallpaperManager.setWallpaper(routes?.params?.url, TYPE.FLAG_SYSTEM)
    console.log("result", result)
  }

  

  const downloadImage = () => {
    
    let date = new Date();
    let image_URL = routes?.params?.url;  
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          '.jpg',
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        if(res){
          ToastAndroid.show("Image Download Successfully", ToastAndroid.SHORT);
        }
      });
  };

  return (
    <FastImage
      onLoadStart={() => setLoader(true)}
      onLoadEnd={() => setLoader(false)}
      source={{ uri: routes?.params?.url, priority: FastImage.priority.normal, }}
      style={[styles.container, { paddingTop: top + hp(2) }]}>
      {loader && <ActivityIndicator color={colors.dark} size={'large'} style={styles.loader} />}
      <View style={styles.mainContainer}>
      <TouchableOpacity style={{ marginRight: wp(4) }} onPress={() => navigation.goBack()}>
        <View style={styles.bottom}>
        <Image source={imagePath.backArrow} style={styles.backArrow} />
        </View>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: wp(4) }} onPress={() => downloadImage()}>
          <View style={styles.bottom}>
            <Image source={imagePath.arrowCircle} style={styles.backArrow} />
          </View>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: wp(4) }} onPress={async () => setLockWallpaper()}>
          <View style={styles.bottom}>
            <Image source={imagePath.lock} style={styles.backArrow} />
          </View>
          <Text style={styles.text}>Lock</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => setHomeWallpaper()}>
          <View style={styles.bottom}>
            <Image source={imagePath.homeWhite} style={styles.backArrow} />
          </View>
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
      </View>
    </FastImage>
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
    fontFamily: fonts.SEMIBOLD,
    color: colors.white,
    alignSelf: 'center'
  },
  loader: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
})