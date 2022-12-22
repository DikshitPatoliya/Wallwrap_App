import { ActivityIndicator, FlatList,StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts } from '../utils/fontsPath'
import { colors } from '../utils/colors'
import { hp, wp } from '../utils/responsiveScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image'
import axios from 'axios'
import { commanStyle } from '../utils/commanStyle'

const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [recently, setRecently] = useState([]);
  const IsFoused = useIsFocused();
  const [firebaseData,setFirebaseData] = useState();
  const [page, setPage] = useState(1);
  const [recentlyLoader, setRecentlyLoader] = useState(false);
  const [totalPage, setTotalPage] = useState();

  useEffect(() =>{
    setPage(1)
  },[IsFoused])

  useEffect(() => {
      getRecentlyImage();
  }, [page])

  const getRecentlyImage = async () => {
    const Recently = await firestore().collection('RecentlyUploaded').doc('RecentlyUploaded').get();
    setFirebaseData(Recently.data())
  //   setRecentlyLoader(true)
  //  await axios.get(`https://api.unsplash.com/search/collections?page=${page}&query=wallpaper&client_id=ePkn5QB9CUFf4h_URl5dlMUdmCaCgjvIpKwNk2gu6ik&per_page=30`)
  // .then(function (response) {
  //   setTotalPage(response?.data?.total_pages)
  //   if(page == 1){
  //     setRecently([recently])
  //   }else{
  //     setRecently([...recently, ...response?.data?.results])
  //   }
  //   setRecentlyLoader(false)
  // })
  // .catch(async (error) => {
      
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
      {recentlyLoader ? <ActivityIndicator color={colors.dark} /> : null}
    </View>
  )
}


  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
        <Text style={[styles.topText, { marginHorizontal: wp(5) }]}>New Arrival</Text>
        <FlatList
          data={firebaseData ? firebaseData?.all : recently}
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal:wp(4.5)}}
          numColumns={2}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          columnWrapperStyle={{justifyContent:'space-between'}}
          renderItem={(item) => {
            return (
              <TouchableOpacity                   
              onPress={() => navigation.navigate('FullScreenImage', { 
                url:  item?.item?.image 
              })}
              >
              <FastImage
                source={{
                  uri:  item?.item?.image, 
                  priority:FastImage.priority.high,
                  caches:FastImage.cacheControl.cacheOnly
                }}
                style={commanStyle.image}
              />
              </TouchableOpacity>
            )
          }}
        />
        {/* <FlatList
          data={firebaseData ? firebaseData?.all : recently}
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal:wp(4.5)}}
          numColumns={2}
          onEndReachedThreshold={16}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          onEndReached={onEndReached}
          ListFooterComponent={ListFooterComponent}
          columnWrapperStyle={{justifyContent:'space-between'}}
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