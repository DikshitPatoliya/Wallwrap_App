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
import FullScreenImage from '../screen/FullScreenImage';
import CategoriesDetailScreen from '../screen/CategoriesDetailScreen';
import TopDetailScreen from '../screen/TopDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const Routes = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen  name="FullScreenImage" component={FullScreenImage}/>
      <Stack.Screen name="CategoriesDetailScreen" component={CategoriesDetailScreen}/>
      <Stack.Screen name="TopDetailScreen" component={TopDetailScreen}/>

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
              height: hp(9), 
              backgroundColor: colors.white,
            },
            tabBarLabel: ({ focused }) => (
                <View style={{
                    borderWidth: focused ?hp(0.3) : 0, 
                    width:wp(6), 
                    marginBottom:wp(5),
                    borderRadius:wp(5),
                    borderColor: colors.orange
                }}/>
            ),
            tabBarIcon: ({  focused }) => (
              <View style={{justifyContent:"center"}}>
                {
                  route.name == 'HomeTab' ?
                   <Image source={imagePath.home} style={[styles.icons,{tintColor: focused ?  colors.orange : colors.black}]} />
                    :
                    route.name == 'Categories' ?
                    <Image source={imagePath.grid} style={[styles.icons,{tintColor: focused ?  colors.orange : colors.black}]}/>
                      :
                      <Image source={imagePath.trending} style={[styles.icons,{tintColor: focused ?  colors.orange : colors.black}]}/>
                }
              </View>
            ),
          })}>
              <Tab.Screen name="HomeTab" component={HomeTab} />
              <Tab.Screen name="Categories" component={Categories} />
              <Tab.Screen name="TrendingScreen" component={TrendingScreen} />
        </Tab.Navigator>
    )
}

function HomeTab() {
  return(
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
    </Stack.Navigator>
  )
}

function Categories() {
  return(
    <Stack.Navigator initialRouteName='CategoriesScreen' screenOptions={{headerShown:false}}>
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen}/>
    </Stack.Navigator>
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