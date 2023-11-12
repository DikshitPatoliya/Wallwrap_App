import { ActivityIndicator, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { imagePath } from '../utils/ImagePath';
import { fonts } from '../utils/fontsPath';
import { useNavigation, useRoute } from '@react-navigation/native';
import WallpaperManager, { TYPE } from "react-native-wallpaper-manage";
import RNFetchBlob from 'rn-fetch-blob';
import { useDispatch } from 'react-redux';
import { updateImageCount } from '../Redux/ImageSlice';
import { createImageProgress } from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const FullScreenImage = () => {

  const Image = createImageProgress(ImageBackground);

	const dispatch = useDispatch();

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();
  const [loader, setLoader] = useState(false);

  useEffect(() => { 
    const params = {
      countType: "VIEW",
      id: routes?.params?.item?.id
    }
    dispatch(updateImageCount(params))
  },[])
  
  const setLockWallpaper = async () => {
    await WallpaperManager.setWallpaper(routes?.params?.item?.url, TYPE.FLAG_LOCK)
  }

  const setHomeWallpaper = async () => {
     await WallpaperManager.setWallpaper(routes?.params?.item?.url, TYPE.FLAG_SYSTEM)
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
      .then(async(res) => {
        if(res){
          const params = {
            countType: "DOWNLOAD",
            id: routes?.params?.item?.id
          }
         await dispatch(updateImageCount(params))
        ToastAndroid.show("Image Download Successfully", ToastAndroid.SHORT);
        }
      });
  };

  return (
    <Image
      source={{ uri: routes?.params?.item?.url }}
      indicator={ProgressBar}
      indicatorProps={{
        size: 20,
        borderWidth: 0,
        color: 'rgba(150, 150, 150, 1)',
        unfilledColor: 'rgba(200, 200, 200, 0.2)'
      }}
      imageStyle={{
        backgroundColor:'rgba(200, 200, 200, 0.2)'
      }}
      style={[styles.container, { paddingTop: top + hp(2) }]}>
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
    </Image>
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