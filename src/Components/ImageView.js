import { Image,  StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { hp, wp } from '../utils/responsiveScreen'
import FastImage from 'react-native-fast-image'
import { imagePath } from '../utils/ImagePath'
import { commanStyle } from '../utils/commanStyle'

const ImageView = ({loader, uri, onPress, onLoadStart,onLoadEnd,imageStyle,priority}) => {
  return (
    <View>
    <TouchableOpacity  disabled={ loader == false ? false : true} onPress={onPress}>
      {loader && 
      <View style={styles.loader}>
      <Image source={imagePath.wLogo} style={commanStyle.wLogo} /> 
      </View>
      }
      <FastImage  
      source={{ 
        uri: uri , 
        priority:priority,
      }} 
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      resizeMode={FastImage.resizeMode.cover}
      style={[styles.recentlyImage,imageStyle]} />
    </TouchableOpacity>
    </View>
  )
}

export default ImageView

const styles = StyleSheet.create({
    recentlyImage: {
        width: wp(44),
        height: wp(70),
        marginBottom: hp(1.6),
        borderRadius: wp(3),
        resizeMode: 'cover',
      },
      loader:{
        width: wp(44),
        marginHorizontal: wp(0.5),
        position:"absolute",
        alignSelf:"center",
        justifyContent:"center",
        backgroundColor:colors.white,
        zIndex:999,
        height: wp(70),
        marginBottom: hp(1),
        borderRadius: wp(3),
        resizeMode: 'cover',
      }
})