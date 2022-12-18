import { ActivityIndicator, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts } from '../utils/fontsPath'
import { colors } from '../utils/colors'
import { hp, wp } from '../utils/responsiveScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import ImageView from '../Components/ImageView'

const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [recently, setRecently] = useState();
  const IsFoused = useIsFocused();
  const [loader, setLoader] = useState(false);
  const [recentlyLoader, setRecentlyLoader] = useState(false);

  useEffect(() => {
    if (IsFoused) {
      getImage();
    }
  }, [IsFoused])

  useEffect(() => {
    if (IsFoused) {
      getRecentlyImage();
    }
  }, [IsFoused])

  const getRecentlyImage = async () => {
    const Recently = await firestore().collection('RecentlyUploaded').doc('RecentlyUploaded').get();
    setRecently(Recently.data())
  }

  const getImage = async () => {
    const user = await firestore().collection('Categories').doc('Top').get();
    setData(user.data())
  }

  return (
    <View style={[styles.container, { paddingTop: top + hp(2) }]}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.rowView}>
          <Text style={styles.topText}>Top</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TopDetailScreen', { item: data?.all })}>
            <Text style={styles.topText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: wp(5) }}>
          <FlatList
            horizontal
            data={data?.all.slice(0, 5)}
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
        <Text style={[styles.topText, { marginHorizontal: wp(5) }]}>Recently Uploaded</Text>
        <View style={{ marginHorizontal: wp(5) }}>
          <FlatList
            data={recently?.all}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.columns}
            renderItem={(item) => {
              return (
                <View style={{ flex: 1 }}>
                  <ImageView
                    uri={item?.item?.image}
                    loader={recentlyLoader}
                    onLoadStart={() => setRecentlyLoader(true)}
                    onLoadEnd={() => setRecentlyLoader(false)}
                    onPress={() => navigation.navigate('FullScreenImage', { url: item?.item?.image })}
                  />
                </View>
              )
            }}
          />
        </View>
      </ScrollView>
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
    color: colors.black,
    fontSize: 18,
  },
  image: {
    height: hp(25),
    borderRadius: wp(5)
  },
  colorsTone: {
    height: hp(7),
    width: wp(15),
    marginRight: wp(2),
    borderRadius: wp(3)
  },
  columns: {
    flex: 1,
    paddingVertical: hp(2),
  },
  recentlyImage: {
    width: wp(43),
    marginHorizontal: wp(0.5),
    height: wp(70),
    marginBottom: hp(1),
    borderRadius: wp(3),
    resizeMode: 'cover',
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