import { ActivityIndicator, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { fonts } from '../utils/fontsPath';
import { useNavigation, validatePathConfig } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { commanStyle } from '../utils/commanStyle';
import FastImage from 'react-native-fast-image';

const CategoriesScreen = () => {


  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getImage()
  }, [])

  const getImage = async () => {
    setLoader(true)
    const user = await firestore().collection('CategoriesName').doc('CategoriesName').get();
    setData(user.data())
      setLoader(false)
  }


  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      {loader && <ActivityIndicator size={"large"} color={colors.dark} style={commanStyle.loader} />}
      <Text style={styles.topText}>Categories</Text>
      <FlatList
      data={data?.all}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: hp(3) }}
      renderItem={(item) => {
        return(
          <TouchableOpacity onPress={() => navigation.navigate('CategoriesDetailScreen',{type:item?.item?.title})}>
          <FastImage  
          source={{
            uri: item?.item?.image,
            priority: FastImage.priority.high,
          }} 
          resizeMode={FastImage.resizeMode.cover}
          style={styles.categoriesImage}>
          <View style={styles.darkImage}/>
          <Text style={styles.titleText}>{item?.item?.title}</Text>
          </FastImage>
          </TouchableOpacity>
        )
      }}
      />
     
    </View>
  )
}

export default CategoriesScreen

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
  categoriesImage:{
    width:wp(90),
    height:wp(50),
    borderRadius:wp(3),
    justifyContent:"center",
    marginBottom:hp(2)

  },
  darkImage:{
    backgroundColor:colors.black_40,
    flex:1,
    borderRadius: wp(3),

  },
  titleText:{
    position:'absolute', 
    color:colors.white,
    fontFamily:fonts.SEMIBOLD,
    fontSize:35,
    alignSelf:"center",
  }
})