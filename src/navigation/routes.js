import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import CategoriesScreen from '../screen/CategoriesScreen';
import TrendingScreen from '../screen/TrendingScreen';
import { imagePath } from '../utils/ImagePath';
import { colors } from '../utils/colors';
import { hp, wp } from '../utils/responsiveScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const Routes = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Home() {

    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.orange,
            tabBarInactiveTintColor: colors.black,
            tabBarStyle: { 
              borderTopWidth: 0,
              height: hp(8.5), 
              backgroundColor: colors.white,
              marginHorizontal:wp(10),
              position:'absolute',
              bottom:hp(4),
              borderRadius:wp(15),
              shadowColor: "#000",
              shadowOffset: {
	              width: 0,
               	height: 0,
              },
              shadowOpacity: 0.10,
              shadowRadius: 6.68,
              elevation: 11,
            },
            tabBarLabel: ({ focused }) => (
                <View style={{
                    borderWidth: focused ?hp(0.3) : 0, 
                    width:wp(6), 
                    bottom:hp(1.5),
                    borderRadius:wp(5),
                    borderColor: colors.orange
                }}/>
            ),
            tabBarIcon: ({  focused }) => (
              <View style={{justifyContent:"center"}}>
                {
                  route.name == 'HomeScreen' ?
                   <Image source={imagePath.home} style={[styles.icons,{tintColor: focused ?  colors.orange : colors.black}]} />
                    :
                    route.name == 'CategoriesScreen' ?
                    <Image source={imagePath.grid} style={[styles.icons,{tintColor: focused ?  colors.orange : colors.black}]}/>
                      :
                      <Image source={imagePath.trending} style={[styles.icons,{tintColor: focused ?  colors.orange : colors.black}]}/>
                }
              </View>
            ),
          })}>
              <Tab.Screen name="HomeScreen" component={HomeScreen} />
              <Tab.Screen name="CategoriesScreen" component={CategoriesScreen} />
              <Tab.Screen name="TrendingScreen" component={TrendingScreen} />
        </Tab.Navigator>
    )
}

export default Routes

const styles = StyleSheet.create({
  icons:{
    width:wp(7),
     height:wp(7),
     resizeMode:'contain',
    }
})