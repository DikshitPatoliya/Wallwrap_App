import React, { useEffect } from 'react'
import Routes from './src/navigation/routes'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/Redux/store'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
    <Routes/>
    </PersistGate>
    </Provider>
  )
}
export default App
