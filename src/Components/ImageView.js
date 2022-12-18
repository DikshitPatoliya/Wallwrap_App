import { ActivityIndicator,  StyleSheet,  TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { hp, wp } from '../utils/responsiveScreen'
import FastImage from 'react-native-fast-image'

const ImageView = ({loader, uri, onPress, onLoadStart,onLoadEnd}) => {
  return (
    <View>
    <TouchableOpacity  disabled={ loader == false ? false : true} onPress={onPress}>
      {loader && <ActivityIndicator color={colors.orange} style={styles.loader}/> }
      <FastImage  
      source={{ 
        uri: uri , 
        priority: FastImage.priority.high,
      }} 
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      resizeMode={FastImage.resizeMode.cover}
      style={[styles.recentlyImage]} />
    </TouchableOpacity>
    </View>
  )
}

export default ImageView

const styles = StyleSheet.create({
    recentlyImage: {
        width: wp(43),
        height: wp(70),
        marginHorizontal:wp(0.5),
        marginBottom: hp(1),
        borderRadius: wp(3),
        resizeMode: 'cover',
      },
      loader:{
        width: wp(43),
        marginHorizontal: wp(0.5),
        position:"absolute",
        backgroundColor:colors.white,
        zIndex:999,
        height: wp(70),
        marginBottom: hp(1),
        borderRadius: wp(3),
        resizeMode: 'cover',
      }
})