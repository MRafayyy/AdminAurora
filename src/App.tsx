/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import 'react-native-gesture-handler'; --no needed only npm se krna tha
import React from 'react';
import { useEffect, useState } from 'react';
// import { Icon } from 'react-native-vector-icons/Icon';

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import NetInfo from "@react-native-community/netinfo";
import { addEventListener } from "@react-native-community/netinfo";

// import messaging from '@react-native-firebase/messaging'
import { TransitionSpecs } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';


import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  useColorScheme,
  Dimensions
} from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Header, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

import { TabView, SceneMap } from 'react-native-tab-view';



import Screen_Login from './screens/Screen_Login';

// import Screen_Registration from './screens/Screen_Registration';
// import { default as Home } from './screens/Screen_Home';
// import Screen_Splash from './screens/Screen_Splash';


// import Screen_ForgotPassword from './screens/Screen_ForgotPassword'
import Screen_FirebaseNotif from './screens/Screen_FirebaseNotif';
// import PushNotification from "react-native-push-notification";
// import Screen_Decider from './screens/Screen_Decider';
// import { default as Settings } from './screens/Screen_Settings'
// import { default as Contacts } from './screens/Screen_SearchContacts';
import HomeTabs from './HomeTabs';
import { RevealFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';


import { useConnectionStatus } from './components/NoInternet';

import ip from './screens/IPaddress';
import { UserIdProvider } from './UserIdContext';
import { connectToSocket } from './components/SocketServiceAdmin';
import Screen_Splash from './screens/Screen_Splash';

function App() {

  const socket = connectToSocket();
  console.log("first"+socket)

  const [isLoggedIn, setisLoggedIn] = useState(false)

  const isConnected = useConnectionStatus()



  return (
    <>

      {/* {isConnectedtoSocket? <Text>hey</Text>:  */}
      <UserIdProvider>

        <NavigationContainer>
          <Stack.Navigator initialRouteName='Screen_Splash' screenOptions={{ animationEnabled: true, animationTypeForReplace: 'push', ...TransitionPresets.RevealFromBottomAndroid }}  >
            {/* <Stack.Screen name="Screen_Splash" component={Screen_Splash} options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="Screen_Decider" component={Screen_Decider} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Screen_Splash" component={Screen_Splash} options={{
              headerShown: false
            }} />
            <Stack.Screen name="Screen_Login" component={Screen_Login} options={{
              headerShown: false
            }} />

            {/* <Stack.Screen name="Screen_Registration" component={Screen_Registration} options={{
              headerShown: false
            }} /> */}
            {/* <Stack.Screen name="Screen_ForgotPassword" component={Screen_ForgotPassword} options={{ headerShown: false }} /> */}
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{
              headerShown: false
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserIdProvider>

      {/* }  */}
    </>

  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
    // marginBottom: "13%"
  },
  text: {
    margin: 10,
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
    // marginBottom: 20
  }

});

export default App;
