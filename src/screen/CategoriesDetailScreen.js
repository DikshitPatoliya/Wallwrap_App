import {   FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { imagePath } from '../utils/ImagePath';
import { fonts } from '../utils/fontsPath';
import firestore from '@react-native-firebase/firestore';
import ImageView from '../Components/ImageView';
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

const CategoriesDetailScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const IsFoused = useIsFocused();

  useEffect(() => {
    if(IsFoused){
      getImage()
    }
  }, [IsFoused])

  const getImage = async () => {
    const user = await firestore().collection('Categories').doc(`${routes?.params?.type}`).get();
    setData(user.data())
  }

  return (
    <View style={[styles.container, { paddingTop: top + hp(1) }]}>
      <View style={{ flexDirection: 'row', marginHorizontal:wp(5) }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={imagePath.backArrow} style={styles.backIcons} />
        </TouchableOpacity>
        <View style={{ alignSelf: "center", flex: 1 }}>
          <Text style={styles.headerText}>{routes?.params?.type}</Text>
        </View>
      </View>
      <FlatList
          data={data?.all}
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal:wp(4.5)}}
          columnWrapperStyle={{justifyContent:'space-between'}}
          contentContainerStyle={styles.columns}
          renderItem={(item) => {
            return (
                <ImageView
                  uri={item?.item?.image}
                  loader={loader}
                  onLoadStart={() => setLoader(true)}
                  onLoadEnd={() => setLoader(false)}
                  onPress={() => navigation.navigate('FullScreenImage', { url: item?.item?.image })}
                />
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