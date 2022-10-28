import { Dimensions, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { fonts } from '../utils/fontsPath'
import { colors } from '../utils/colors'
import { hp, wp } from '../utils/responsiveScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { ColorTone, ImageData } from '../utils/JSONData'



const HomeScreen = () => {

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
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.topText}>Top</Text>
        <View style={{ alignSelf: "center", height: hp(25), marginTop: hp(3) }}>
          <Carousel
            autoplay={true}
            loop={true}
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
        <Pagination
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
        />
        <Text style={styles.topText}>The color tone </Text>
        <View>
          <FlatList
            data={ColorTone}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ paddingVertical: hp(2) }}
            renderItem={(item) => {
              return (
                <View style={[styles.colorsTone, { backgroundColor: item.item.color }]} />
              )
            }} />
        </View>
        <Text style={styles.topText}>Recently Uploaded</Text>
        
        <FlatList
          data={ImageData}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.columns}
          renderItem={(item) => {
            return (
              <View style={{ flex: 1}}>
                <Image source={{ uri: item.item.image }} style={styles.recentlyImage} />
              </View>
            )
          }}
        />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(5)
  },
  topText: {
    fontFamily: fonts.SEMIBOLD,
    color: colors.black,
    fontSize: 18,
  },
  image: {
    height: hp(25),
    borderRadius: wp(5)
  },
  colorsTone: {
    height: hp(7),
    width: wp(15),
    marginRight: wp(2),
    borderRadius: wp(3)
  },
  columns: {
    flex: 1,
    paddingVertical: hp(2)
  },
  recentlyImage: {
    width: wp(43),
    marginHorizontal:wp(0.5),
    height: wp(70),
    marginBottom: hp(1),
    borderRadius: wp(3),
    resizeMode: 'cover',
   
  }
})