import {  Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp, wp } from '../utils/responsiveScreen';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fontsPath';
import Carousel from 'react-native-snap-carousel';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { imagePath } from '../utils/ImagePath';
import { commanStyle } from '../utils/commanStyle';

const TrendingScreen = () => {

  const { top } = useSafeAreaInsets();
  const SLIDER_WIDTH = Dimensions.get('window').width + 80
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
  const [data, setData] = useState();
  const navigation = useNavigation();
  const IsFoused = useIsFocused();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (IsFoused) {
      getImage()
    }
  }, [IsFoused])

  const getImage = async () => {
    const user = await firestore().collection('Categories').doc('Trending').get();
    setData(user.data())
  }
  const renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity disabled={ loader == false ? false : true} onPress={() => navigation.navigate('FullScreenImage', { url: item?.image })}>
        {loader &&
        <View style={[styles.image, {
          width: ITEM_WIDTH,
          position:'absolute',
          zIndex:999,
          justifyContent:"center",
          backgroundColor:colors.white
        }]}>
         <Image source={imagePath.wLogo} style={commanStyle.wLogo} /> 
        </View>}
        <Image
          source={{ uri: item?.image}}
          onLoadStart={() => setLoader(true)}
          onLoadEnd={() => setLoader(false)}
          style={[styles.image, { width: ITEM_WIDTH }]}
          />
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      <Text style={styles.title}>Trending</Text>
      <View style={styles.silderView}>
        <Carousel
          autoplay={true}
          loop={true}
          layout="default"
          layoutCardOffset={9}
          data={data?.all}
          renderItem={renderItems}
          sliderWidth={wp(100)}
          itemWidth={wp(85)}
          inactiveSlideShift={0}
          useScrollView={true}
        />
      </View>
    </View>
  )
}

export default TrendingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    alignSelf: "center",
    fontSize: 45,
    fontFamily: fonts.SEMIBOLD,
    color: colors.dark
  },
  image: {
    height: hp(70),
    borderRadius: wp(5)
  },
  button: {
    backgroundColor: colors.dark_blue,
    alignSelf: "center",
    borderRadius: wp(2),
    marginTop: hp(5),
  },
  buttonText: {
    color: colors.white,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    fontFamily: fonts.SEMIBOLD,
    fontSize: 20
  },
  silderView: {
    alignSelf: "center",
    height: hp(80),
    marginTop: hp(3)
  },
  loader: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    zIndex: 9999
  }
})