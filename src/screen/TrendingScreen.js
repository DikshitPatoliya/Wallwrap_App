import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp, wp } from '../utils/responsiveScreen';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fontsPath';
import Carousel from 'react-native-snap-carousel';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getImageTrending } from '../Redux/ImageSlice';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const TrendingScreen = () => {
  const Image = createImageProgress(FastImage);

  const { trendingImages } = useSelector((state) => state.getRecentImageReducer);
  const dispatch = useDispatch();

  const { top } = useSafeAreaInsets();
  const SLIDER_WIDTH = Dimensions.get('window').width + 80
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
  const navigation = useNavigation();
  const IsFoused = useIsFocused();


  useEffect(() => {
    if (IsFoused) {
      dispatch(getImageTrending())
    }
  }, [IsFoused])


  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('FullScreenImage', { item: item })}>
        <Image
          source={{
            uri: item?.url,
            priority: FastImage.priority.high,
            caches: FastImage.cacheControl.cacheOnly
          }}
          indicator={ProgressBar}
          indicatorProps={{
            size: 20,
            borderWidth: 0,
            color: 'rgba(150, 150, 150, 1)',
            unfilledColor: 'rgba(200, 200, 200, 0.2)'
          }}
          imageStyle={{
            borderRadius: wp(3),
            backgroundColor: 'rgba(200, 200, 200, 0.2)'
          }}
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
          data={trendingImages?.data || []}
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