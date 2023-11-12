import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { imagePath } from '../utils/ImagePath';
import { fonts } from '../utils/fontsPath';
import FastImage from 'react-native-fast-image';
import { commanStyle } from '../utils/commanStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryImage } from '../Redux/ImageSlice';
import { FlashList } from '@shopify/flash-list';
import { createImageProgress } from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const CategoriesDetailScreen = () => {
  const Images = createImageProgress(FastImage);

  const { imagesByCategory } = useSelector((state) => state.getRecentImageReducer);
  const dispatch = useDispatch();

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();
  const IsFoused = useIsFocused();


  useEffect(() => {
    if (IsFoused) {
      dispatch(getCategoryImage({ id: routes?.params?.id }))
    }
  }, [IsFoused])

  const onEndReached = async () => {
    if (imagesByCategory?.next && imagesByCategory?.next <= imagesByCategory?.lastPage) {
      await dispatch(getCategoryImage({ page: imagesByCategory?.next, id: routes?.params?.id }))
    }
  }



  return (
    <View style={[styles.container, { paddingTop: top + hp(1) }]}>
      <View style={{ flexDirection: 'row', marginHorizontal: wp(5) }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={imagePath.backArrow} style={styles.backIcons} />
        </TouchableOpacity>
        <View style={{ alignSelf: "center", flex: 1 }}>
          <Text style={styles.headerText}>{routes?.params?.type}</Text>
        </View>
      </View>
      <FlashList
        data={imagesByCategory?.data || []}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        onEndReached={onEndReached}
        renderItem={({ item }) => {
          return (
            <View style={{ marginHorizontal: wp(2) }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FullScreenImage', { item: item })}>
                <Images
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

export default CategoriesDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backIcons: {
    tintColor: 'black',
    width: wp(8),
    height: wp(8)
  },
  headerText: {
    alignSelf: "center",
    fontSize: 25,
    color: colors.black,
    fontFamily: fonts.SEMIBOLD
  },
  columns: {
    paddingVertical: hp(2),
  },
})