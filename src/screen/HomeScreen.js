import { FlatList,StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts } from '../utils/fontsPath'
import { colors } from '../utils/colors'
import { hp, wp } from '../utils/responsiveScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import ImageView from '../Components/ImageView'
import FastImage from 'react-native-fast-image'

const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [recently, setRecently] = useState();
  const IsFoused = useIsFocused();
  const [recentlyLoader, setRecentlyLoader] = useState(false);

  useEffect(() => {
      getRecentlyImage();
  }, [IsFoused])

  const getRecentlyImage = async () => {
    const Recently = await firestore().collection('RecentlyUploaded').doc('RecentlyUploaded').get();
    setRecently(Recently.data())
  }

  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
        <Text style={[styles.topText, { marginHorizontal: wp(5) }]}>New Arrival</Text>
        <FlatList
          data={recently?.all}
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal:wp(4.5)}}
          numColumns={2}
          columnWrapperStyle={{justifyContent:'space-between'}}
          renderItem={(item) => {
            return (
                <ImageView
                  uri={item?.item?.image}
                  loader={recentlyLoader}
                  onLoadStart={() => setRecentlyLoader(true)}
                  onLoadEnd={() => setRecentlyLoader(false)}
                  onPress={() => navigation.navigate('FullScreenImage', { url: item?.item?.image })}
                />
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