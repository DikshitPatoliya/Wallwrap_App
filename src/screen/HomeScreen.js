import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts } from '../utils/fontsPath'
import { colors } from '../utils/colors'
import { hp, wp } from '../utils/responsiveScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import { commanStyle } from '../utils/commanStyle'
import { useDispatch, useSelector } from 'react-redux'
import { getImageRecent } from '../Redux/ImageSlice'
import { FlashList } from '@shopify/flash-list'
import { createImageProgress } from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const HomeScreen = () => {
  const { recentImages } = useSelector((state) => state.getRecentImageReducer);
  const dispatch = useDispatch();

  const Image = createImageProgress(FastImage);

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const IsFoused = useIsFocused();

  useEffect(() => {
    if (IsFoused) {
      dispatch(getImageRecent())
    }
  }, [IsFoused])


  const onEndReached = async() => {
    if(recentImages?.next && recentImages?.next <= recentImages?.lastPage){
      await dispatch(getImageRecent({page: recentImages?.next}))
    }
  }


  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Text style={[styles.topText, { marginHorizontal: wp(5) }]}>New Arrival</Text>
      <FlashList
        data={recentImages?.data || []}
        style={{ flex: 1}}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        estimatedItemSize={200}
        renderItem={({ item }) => {
          return (
            <View style={{ marginHorizontal:wp(2)}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FullScreenImage', { item: item })}>
              <Image
                source={{
                  uri: item?.url,
                  priority:FastImage.priority.high,
                  caches:FastImage.cacheControl.cacheOnly
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
                    backgroundColor:'rgba(200, 200, 200, 0.2)'
                }}
                style={commanStyle.image}
              />
            </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topText: {
    fontFamily: fonts.SEMIBOLD,
    color: colors.dark,
    fontSize: 40,
  },
  silderView: {
    alignSelf: "center",
    height: hp(25),
    marginTop: hp(3)
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginTop: hp(2)
  }
})