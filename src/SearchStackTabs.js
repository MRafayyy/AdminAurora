import React from "react"

import { View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import Screen_SearchUsers from "./screens/Screen_SearchUsers";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import Screen_UsersInfo from "./screens/SearchUserScreens/Screen_UsersInfo";
import Screen_Maps from "./screens/SearchUserScreens/Screen_Maps";

const Stack = createStackNavigator()

export default function SearchStackTabs() {




    return (
        <>
            {/* <Stack.Navigator initialRouteName='Screen_SearchContacts' screenOptions={{ animationEnabled: true, animationTypeForReplace: 'push', ...TransitionPresets.RevealFromBottomAndroid }}  > */}
            <Stack.Navigator initialRouteName='Screen_SearchContacts'  >
                <Stack.Screen name="SearchUsers" component={Screen_SearchUsers} options={({ navigation }) => ({
                    headerShown: true,
                    title: 'Users',
                    headerRight: () => (

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveScreenWidth(4), paddingHorizontal: 9 }}>
                            <Ionicons name='chatbox-ellipses-outline' size={24} color={'black'} onPress={() => navigation.navigate('Screen_MyFriends')} />
                            <MaterialCommunityIcons name='account-multiple' size={28} color={'black'}
                                onPress={() => navigation.navigate('Screen_Friends')}
                            />
                        </View>
                        // <Pressable
                        //   onPress={() => alert('This is a button!')}
                        //   title="Info"
                        //   color="#000"
                        //   style={{marginRight: 10, backgroundColor: '#000' }}
                        // >
                        //     <Text style={{color: 'white'}}>hey</Text>
                        //      </Pressable> 
                    ),
                    headerLeft: () => null,

                })} />

                <Stack.Screen name="Screen_UsersInfo" component={Screen_UsersInfo} options={{
                    headerShown: true,
                    headerTitle: 'User Information'
                }} />
                
                <Stack.Screen name="Screen_Maps" component={Screen_Maps} options={{
                    headerShown: false,
                    headerTitle: 'User Information'
                }} />
              
                {/* 
                <Stack.Screen name="Screen_MyFriends" component={Screen_MyFriends} options={{
                    headerShown: true,
                    headerTitle: 'Friends'
                }} /> */}

            </Stack.Navigator>
        </>
    )
}