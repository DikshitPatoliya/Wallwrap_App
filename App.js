import React, { useEffect } from 'react'
import Routes from './src/navigation/routes'
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <Routes/>
  )
}
export default App
