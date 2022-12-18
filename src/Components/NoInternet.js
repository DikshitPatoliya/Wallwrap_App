import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { imagePath } from '../utils/ImagePath'
import { wp } from '../utils/responsiveScreen'
import { fonts } from '../utils/fontsPath'

const NoInternet = () => {
  return (
    <View style={styles.container}>
        <Image source={imagePath.noInternet} style={styles.image}/>
      <Text style={styles.text}>oops! No Internet detected!</Text>
      <Text style={styles.text}>Please connect to internet</Text>
    </View>
  )
}

export default NoInternet

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.white, 
        position:"absolute",
        justifyContent:"center",
        zIndex:999,
        top:0,
        bottom:0,
        right:0,
        left:0
    },
    text:{
        color:colors.black,
        alignSelf:"center",
        fontSize:15,
        fontFamily:fonts.MEDIUM
    },
    image:{
        width:wp(50),
        height:wp(50),
        alignSelf:"center"
    }
})