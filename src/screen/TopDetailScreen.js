import { StyleSheet, View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import ImageView from '../Components/ImageView';
import { fonts } from '../utils/fontsPath';
import firestore from '@react-native-firebase/firestore';

const TopDetailScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();

  useEffect(() =>{
    getImage()
  },[])

  const getImage = async () => {
    const user = await firestore().collection('Categories').doc('Top').get();
    setData(user.data())
  }

  return (
    <View style={[styles.container, { paddingTop: top + hp(1) }]}>
      <Text style={styles.topText}>Top</Text>
      <FlatList
        data={data?.all}
        numColumns={2}
        style={{ marginHorizontal: wp(4.5) }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
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
    marginHorizontal:wp(5)
  }
})