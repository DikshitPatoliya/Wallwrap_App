import {   ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { imagePath } from '../utils/ImagePath';
import { fonts } from '../utils/fontsPath';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { commanStyle } from '../utils/commanStyle';

const CategoriesDetailScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [firebaseData,setFirebaseData] = useState();
  const IsFoused = useIsFocused();
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1)
  }, [IsFoused])

  // const getImage = async () => {
   
  // }

  useEffect(() =>{
    setPage(1)
  },[IsFoused])

  useEffect(() => {
      getRecentlyImage();
  }, [page])

  const getRecentlyImage = async () => {
    const user = await firestore().collection('Categories').doc(`${routes?.params?.type}`).get();
    setFirebaseData(user.data())
  //   setLoader(true)
  //  await axios.get(`https://api.unsplash.com/search/collections?page=${page}&query=${routes?.params?.type}&client_id=ePkn5QB9CUFf4h_URl5dlMUdmCaCgjvIpKwNk2gu6ik&per_page=30`)
  // .then(function (response) {
  //   setTotalPage(response?.data?.total_pages)
  //   if(page == 1){
  //     setData([data])
  //   }else{
  //     setData([...data, ...response?.data?.results])
  //   }
  //   setLoader(false)
  // })
  // .catch(async (error) => {
  //   console.log(error == 403)
  
  // })
  }

const onEndReached = () => {
  if(page < totalPage){
    setPage((p) => p + 1 )
  }
}

const ListFooterComponent = () => {
  return (
    <View>
      {loader ? <ActivityIndicator color={colors.dark} /> : null}
    </View>
  )
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
      <ScrollView>
        <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:"space-evenly"}}>
      {firebaseData?.all?.map((item) =>{
        return(
          <TouchableOpacity                   
          onPress={() => navigation.navigate('FullScreenImage', {url:item?.image})}>
            <Image  source={{uri: item?.image}} style={commanStyle.image}/>
          {/* <FastImage
            source={{
              uri:  item?.image,
              priority:FastImage.priority.high,
              caches:FastImage.cacheControl.immutable
            }}
            style={commanStyle.image}
          /> */}
          </TouchableOpacity>
        )
      })}
      </View>
      </ScrollView>
      {/* <FlatList
          data={firebaseData ? firebaseData?.all :  data}
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal:wp(4.5)}}
          numColumns={2}
          onEndReached={() => firebaseData?.all ? null : onEndReached}
          ListFooterComponent={() => firebaseData?.all ? null : ListFooterComponent}
          columnWrapperStyle={{justifyContent:'space-between'}}
          contentContainerStyle={styles.columns}
          renderItem={(item) => {
            return (
              <TouchableOpacity                   
              onPress={() => navigation.navigate('FullScreenImage', { 
                url: firebaseData?.all ?  item?.item?.image : item?.item?.cover_photo?.urls?.raw
              })}
              >
              <FastImage
                source={{
                  uri: firebaseData?.all ?  item?.item?.image : item?.item?.cover_photo?.urls?.small,
                  priority:FastImage.priority.high,
                  caches:FastImage.cacheControl.immutable
                }}
                style={commanStyle.image}
              />
              </TouchableOpacity>
            )
          }}
      /> */}
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