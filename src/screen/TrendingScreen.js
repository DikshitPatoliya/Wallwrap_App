import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp, wp } from '../utils/responsiveScreen';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fontsPath';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ImageData } from '../utils/JSONData';

const TrendingScreen = () => {

  const { top } = useSafeAreaInsets();
  const isCarousel = useRef(null)
  const [index, setIndex] = useState(0)
  const SLIDER_WIDTH = Dimensions.get('window').width + 80
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

  const renderItems = ({ item, index }) => {
    return (
      <Image source={{ uri: item.image }} style={[styles.image, { width: ITEM_WIDTH }]} resizeMode="cover" />
    )
  }

  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      <Text style={styles.title}>Trending</Text>
      <View style={{ alignSelf: "center", height: hp(50), marginTop: hp(3)}}>
          <Carousel
            autoplay={false}
            loop={false}
            layout="default"
            layoutCardOffset={9}
            ref={isCarousel}
            data={ImageData}
            renderItem={renderItems}
            sliderWidth={wp(100)}
            itemWidth={wp(85)}
            inactiveSlideShift={0}
            useScrollView={true}
            onSnapToItem={(index) => setIndex(index)}
          />
        </View>
        {/* <Pagination
          dotsLength={ImageData.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: wp(5),
            borderRadius: 4,
            backgroundColor: colors.orange
          }}
          inactiveDotOpacity={0.4}
          tappableDots={true}
        /> */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Quick Set</Text>
        </TouchableOpacity>
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
    height: hp(50),
    borderRadius: wp(5)
  },
  button:{
    backgroundColor: colors.dark_blue,
    alignSelf:"center",
    borderRadius:wp(2),
    marginTop:hp(5),
  },
  buttonText:{
    color:colors.white,
    paddingHorizontal:wp(4),
    paddingVertical:hp(1),
    fontFamily:fonts.SEMIBOLD,
    fontSize:20
  }
})