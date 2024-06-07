import React from "react"

import { StyleSheet, Text, View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import Screen_SearchUsers from "./screens/Screen_SearchUsers";
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import Screen_UsersInfo from "./screens/SearchUserScreens/Screen_UsersInfo";
import Screen_Maps from "./screens/SearchUserScreens/Screen_Maps";
import Search_AppContacts from "./screens/Search_AppContacts";
import fontFamily from "../assets/fontFamily/fontFamily";
import colors from "./utils/color";

const Stack = createStackNavigator()

export default function SearchStackTabs() {




    return (
        <>
            {/* <Stack.Navigator initialRouteName='Screen_SearchContacts' screenOptions={{ animationEnabled: true, animationTypeForReplace: 'push', ...TransitionPresets.RevealFromBottomAndroid }}  > */}
            <Stack.Navigator initialRouteName='Screen_SearchContacts'  >
                <Stack.Screen name="SearchUsers" component={Screen_SearchUsers} options={({ navigation }) => ({
                    headerShown: false,
                    title: 'Users',
                    // headerRight: () => (

                    //     <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveScreenWidth(4), paddingHorizontal: 9 }}>
                    //         <Ionicons name='chatbox-ellipses-outline' size={24} color={'black'} onPress={() => navigation.navigate('Screen_MyFriends')} />
                    //         <MaterialCommunityIcons name='account-multiple' size={28} color={'black'}
                    //             onPress={() => navigation.navigate('Screen_Friends')}
                    //         />
                    //     </View>
                    // ),
                    headerLeft: () => null,

                })} />

                <Stack.Screen name="Search_AppContacts" component={Search_AppContacts} options={{

                    header: () => {
                        <View style={styles.headerContainer}>
                            <MaterialCommunityIcons
                                name="arrow-left"
                                // name="chatbox-ellipses"
                                size={30}
                                color={colors.blue}
                                onPress={() => navigation.navigate('Search_AppContacts')}
                            />
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2.5), lineHeight: responsiveHeight(0) }]}>Contact Users</Text>

                        </View>
                    },

                }} />

                <Stack.Screen name="Screen_UsersInfo" component={Screen_UsersInfo} options={{
                    headerShown: true,
                    headerTitle: 'User Information'
                }} />

                <Stack.Screen name="Screen_Maps" component={Screen_Maps} options={{
                    headerShown: false,
                   
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


const styles = StyleSheet.create({
    text: {
        fontFamily: fontFamily.Regular,
        margin: 5,
        fontSize: 15,
        color: 'black',
        textAlign: 'left',
    },
    headerContainer: {
        marginTop: responsiveHeight(2),
        // alignSelf: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(7),
        paddingHorizontal: responsiveWidth(6),
        paddingRight: responsiveWidth(6),
    },
})