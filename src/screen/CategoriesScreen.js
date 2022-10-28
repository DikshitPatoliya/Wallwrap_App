import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { fonts } from '../utils/fontsPath';
import { categorie } from '../utils/JSONData';

const CategoriesScreen = () => {


  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      <Text style={styles.topText}>Categories</Text>
      <FlatList
      data={categorie}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: hp(3) }}
      renderItem={(item) => {
        return(
          <ImageBackground
          imageStyle={{ borderRadius: wp(3)}}
          source={{uri: item.item.categorieImage}} style={styles.categoriesImage}>
          <View style={styles.darkImage}/>
          <Text style={styles.titleText}>{item.item.categoriesTitle}</Text>
          </ImageBackground>
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