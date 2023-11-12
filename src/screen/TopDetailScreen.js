import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { fonts } from '../utils/fontsPath';
import FastImage from 'react-native-fast-image';
import { commanStyle } from '../utils/commanStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getImageTop } from '../Redux/ImageSlice';
import { FlashList } from '@shopify/flash-list';
import { createImageProgress } from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const TopDetailScreen = () => {
  const Image = createImageProgress(FastImage);
  const { topImages } = useSelector((state) => state.getRecentImageReducer);
  const dispatch = useDispatch();
  const IsFoused = useIsFocused();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    if(IsFoused){
      dispatch(getImageTop())
    }
  }, [IsFoused])

  const onEndReached = async() => {
    if(topImages?.next && topImages?.next <= topImages?.lastPage){
      await dispatch(getImageTop({page: topImages?.next}))
    }
  }



  return (
    <View style={[styles.container, { paddingTop: top + hp(1) }]}>
      <Text style={styles.topText}>Top</Text>
      <FlashList
        data={topImages?.data  || []}
        style={{ flex: 1 }}
        numColumns={2}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ marginHorizontal: wp(2) }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FullScreenImage', { item: item })}
              >
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

export default TopDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backIcons: {
    tintColor: colors.black,
    width: wp(8),
    height: wp(8)
  },
  topText: {
    fontFamily: fonts.SEMIBOLD,
    color: colors.dark,
    fontSize: 40,
    marginHorizontal: wp(5)
  }
})