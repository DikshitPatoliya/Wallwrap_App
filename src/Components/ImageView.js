import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { hp, wp } from '../utils/responsiveScreen'
import FastImage from 'react-native-fast-image'

const ImageView = ({loader, uri, onPress,onLoadEnd, onLoadStart}) => {
  return (
    <View>
    <TouchableOpacity disabled={ loader == false ? false : true} onPress={onPress}>
      {loader ? <ActivityIndicator color={colors.orange} style={styles.recentlyImage}/> :  
      <FastImage  
      source={{ uri: uri , priority: FastImage.priority.high}} 
      resizeMode={FastImage.resizeMode.cover}
      style={styles.recentlyImage} />
    }
    </TouchableOpacity>
  </View>
  )
}

export default ImageView

const styles = StyleSheet.create({
    recentlyImage: {
        width: wp(43),
        marginHorizontal: wp(0.5),
        height: wp(70),
        marginBottom: hp(1),
        borderRadius: wp(3),
        resizeMode: 'cover',
      },
})