import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp, wp } from '../utils/responsiveScreen';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fontsPath';
import Carousel from 'react-native-snap-carousel';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const TrendingScreen = () => {

  const { top } = useSafeAreaInsets();
  const isCarousel = useRef(null)
  const [index, setIndex] = useState(0)
  const SLIDER_WIDTH = Dimensions.get('window').width + 80
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
  const [data, setData] = useState();
  const navigation = useNavigation();
  const IsFoused = useIsFocused();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if(IsFoused){
      getImage()
    }
  }, [IsFoused])

  const getImage = async () => {
    setLoader(true)
    const user = await firestore().collection('Categories').doc('Trending').get();
    setData(user.data())
    setLoader(false)
  }
  const renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('FullScreenImage', { url: item?.image })}>
        <FastImage 
        source={{ uri: item.image ,  priority: FastImage.priority.high}} 
        style={[styles.image, { width: ITEM_WIDTH }]} 
        resizeMode={FastImage.resizeMode.cover} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      {loader && <ActivityIndicator size={'large'} color={colors.orange} style={styles.loader}/>}
      <Text style={styles.title}>Trending</Text>
      <View style={styles.silderView}>
        <Carousel
          autoplay={true}
          loop={true}
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data?.all}
          renderItem={renderItems}
          sliderWidth={wp(100)}
          itemWidth={wp(85)}
          inactiveSlideShift={0}
          useScrollView={true}
          onSnapToItem={(index) => setIndex(index)}
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
    paddingHorizontal: wp(5)
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
  loader:{
    top:0,
    bottom:0,
    right:0,
    left:0,
    position:'absolute',
    zIndex:9999
  }
})