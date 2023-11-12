import { ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { fonts } from '../utils/fontsPath';
import { useNavigation } from '@react-navigation/native';
import { commanStyle } from '../utils/commanStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../Redux/ImageSlice';
import { createImageProgress } from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import { FlashList } from '@shopify/flash-list';

const CategoriesScreen = () => {
  const Image = createImageProgress(ImageBackground);

  const { Category } = useSelector((state) => state.getRecentImageReducer);
	const dispatch = useDispatch();

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCategory())
  }, [])


  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      <Text style={styles.topText}>Categories</Text>
      <View style={{flex:1}}>
        <FlashList
          data={Category || []}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingBottom: hp(10), paddingHorizontal:wp(5)}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity  
              onPress={() => navigation.navigate('CategoriesDetailScreen', { type: item?.name, id : item?.id})}>
                <Image
                  imageStyle={{ borderRadius: wp(3) }}
                  source={{ uri: item?.image }}
                  indicator={ProgressBar}
                  indicatorProps={{
                    size: 20,
                    borderWidth: 0,
                    color: 'rgba(150, 150, 150, 1)',
                    unfilledColor: 'rgba(200, 200, 200, 0.2)'
                  }}
                  style={styles.categoriesImage}>
                  <View style={styles.darkImage} />
                  <Text style={styles.titleText}>{item?.name}</Text>
                </Image>
              </TouchableOpacity>
            )
          }}
        />
        </View>
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topText: {
    fontFamily: fonts.SEMIBOLD,
    color: colors.dark,
    fontSize: 40,
    marginHorizontal: wp(5),
  },
  categoriesImage: {
    width: wp(90),
    height: wp(50),
    borderRadius: wp(3),
    justifyContent: "center",
    marginBottom: hp(2)
  },
  darkImage: {
    backgroundColor: colors.black_40,
    flex: 1,
    borderRadius: wp(3),
  },
  titleText: {
    position: 'absolute',
    color: colors.white,
    fontFamily: fonts.SEMIBOLD,
    fontSize: 35,
    alignSelf: "center",
  }
})