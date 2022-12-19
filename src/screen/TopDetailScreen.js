import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';
import { fonts } from '../utils/fontsPath';
import { imagePath } from '../utils/ImagePath';
import { commanStyle } from '../utils/commanStyle';
import { FadeInFlatList } from '@ja-ka/react-native-fade-in-flatlist';
import FastImage from 'react-native-fast-image';
import ImageView from '../Components/ImageView';

const TopDetailScreen = () => {

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const routes = useRoute();
  const [loader, setLoader] = useState(false);
  
  return (
    <View style={[styles.container, { paddingTop: top + hp(1) }]}>
    {loader && <ActivityIndicator size={"large"} color={colors.dark} style={commanStyle.loader} />}
    <View style={{ flexDirection: 'row',  paddingHorizontal: wp(5)}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={imagePath.backArrow} style={styles.backIcons} />
      </TouchableOpacity>
    </View>
    <FadeInFlatList
          data={routes?.params?.item}
          initialDelay={0}
          numColumns={2}
          durationPerItem={500}
          parallelItems={1}
          style={{marginHorizontal:wp(4.5)}}
          columnWrapperStyle={{justifyContent:'space-between'}}
          itemsToFadeIn={10}
          scrollEnabled={false}
          contentContainerStyle={styles.columns}
          renderItem={(item) => {
            return (
              <View style={{ flex: 0.5}}>
                <ImageView
                  uri={item?.item?.image}
                  loader={loader}
                  priority={FastImage.priority.normal}
                  onLoadStart={() => setLoader(true)}
                  onLoadEnd={() => setLoader(false)}
                  onPress={() => navigation.navigate('FullScreenImage', { url: item?.item?.image })}
                />
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
      },
      backIcons: {
        tintColor: colors.black,
        width: wp(8),
        height: wp(8)
      },
      columns: {
        paddingVertical: hp(2),
      },
})