import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { fonts } from '../utils/fontsPath';
import { imagePath } from '../utils/ImagePath';
import { commanStyle } from '../utils/commanStyle';

const TopDetailScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();
  const [loader, setLoader] = useState();
  
  return (
    <View style={[styles.container, { paddingTop: top + hp(1) }]}>
    {loader && <ActivityIndicator size={"large"} color={colors.dark} style={commanStyle.loader} />}
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={imagePath.backArrow} style={styles.backIcons} />
      </TouchableOpacity>
      <View style={{ alignSelf: "center", flex: 1 }}>
        <Text style={styles.headerText}>{routes?.params?.type}</Text>
      </View>
    </View>
    <FlatList
      data={routes?.params?.item}
      numColumns={2}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.columns}
      renderItem={(item) => {
        return (
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('FullScreenImage', { url: item?.item?.image })}>
              <Image
                source={{ uri: item?.item?.image }}
                style={styles.recentlyImage} />
            </TouchableOpacity>

          </View>
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
        paddingHorizontal: wp(5)
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
      recentlyImage: {
        width: wp(43),
        marginHorizontal: wp(0.5),
        height: wp(70),
        marginBottom: hp(1),
        borderRadius: wp(3),
        resizeMode: 'cover',
      },
})