import React, { useState, PropsWithChildren, useEffect } from "react";
// import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Button,
    PermissionsAndroid,
    Platform,
    Alert,
    BackHandler,
    ActivityIndicator
} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

// import PushNotification from "react-native-push-notification";
// import messaging from '@react-native-firebase/messaging'

// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from 'react-native-keychain';

import ip from './IPaddress';

export default function Screen_FirebaseNotif({ navigation, route }) {

    const [Loader, setLoader] = useState(false);
    function handleBackButtonClick() {
        navigation.navigate('Screen_Home');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    const [TitleText, setTitleText] = useState('');
    const [MessageText, setMessageText] = useState('');

    const onHandleTitleChange = (value) => {
        setTitleText(value);

    }
    const onHandleMessageChange = (value) => {
        setMessageText(value);
    }

    const GoToHomePage = () => {
        navigation.navigate('Screen_Home')
    }

    // useEffect(() => {



    const sendFCMNotifs = async () => {
setLoader(true)
        try {
            let url = `${ip}/sendFCM`
            if (TitleText.length === 0 || MessageText.length === 0) {
                Alert.alert("Empty fields")
            }
            else {
                let notifData = {
                    title: TitleText.trim(),
                    body: MessageText.trim()
                }
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(notifData)
                })
                // response = response.json();
                // console.log(response)
                setLoader(false)
                Alert.alert("Success", "Notification was sent to all users")
            }
        } catch (error) {
            setLoader(false)

        }

        //     try {


        //         // POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1
        //         let url = 'https://fcm.googleapis.com/fcm/send'
        //         let response = await fetch(url, {
        //             method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer AAAADz1-KfI:APA91bGJ-sKa3F15DexhEXHxHp_XWl4dEoC6HChxD6cJF42ad9RzvTj0K0KfxwCLLeAA54nWSGHwxN8ZYd2EIbBHztsXGu57ZG7jt-QKT8peIQYvyhMEWj03oX1kO2I0AYR8KVbs09gO'
        //         },
        //         body: JSON.stringify({

        //             "data": {},
        //             "notification": {
        //                 "body": "This is an FCM notification message!",
        //                 "title": "FCM Message"
        //             },
        //             "to": "c8KHnyMrRTyXNXB9tVglFM:APA91bGVoYH4vYpKUsETdY_RxbAMZ3vXe2u4wLWhDFrya87IyuTyyStgiaypiOCfZgO5HLuMSpnIvZ4LL7gcFzWfk5_zZbT-hodd-D6RMvtkJPKaSIytPKowKcI5HgO3viZWtHFNBlOX",
        //         }

        //         )
        //     })
        //     response  = response.json()
        // } catch (error) {
        //     console.log(error)
        // }

    }









    useEffect(() => {



        async function Logged() {
            try {
                let url = `${ip}/verifyToken`
                const credentials = await Keychain.getGenericPassword();
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(credentials)
                })
                //    console.log(response.text())
                response = await response.json();

                if (response.success === true) {
                    navigation.navigate('Screen_Home')

                }
                else if (response.success === false) {

                }

            } catch (error) {
                // console.info(error)
            }
        }
        // Logged();


    }, [])


    // const [text, setText] = useState('');


    return (
        <>
            <View style={styles.body}>

                <Text style={styles.welcome_text}>Firebase notifications</Text>

                <View style={styles.UsernameInputBoxView}>

                    <TextInput onChangeText={(value) => onHandleTitleChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} editable placeholder='Title' placeholderTextColor={'black'} ></TextInput>
                </View>

                <View style={styles.PasswordInputBoxView}>

                    <TextInput onChangeText={(value) => onHandleMessageChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} editable placeholder='Message' placeholderTextColor={'black'} ></TextInput>
                    {/* <Pressable onPress={goToForgotPasswordScreen} style={{ marginTop: 10 }}><Text style={[styles.text, { textAlign: 'right' }]}>Forgot password?</Text></Pressable> */}
                </View>




                <Pressable onPress={() => { sendFCMNotifs() }
                } style={{ width: '80%', height: 55, backgroundColor: '#0662bf', borderWidth: 1, marginTop: responsiveHeight(1), borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}>{Loader ? <ActivityIndicator size='large' color="#fff" /> :<Text style={{ fontSize: responsiveFontSize(2.2), color: 'white', textAlign: 'center' }}>Send notification</Text>}</Pressable>





            </View>
        </>
    )
}




const styles = StyleSheet.create({
    body: {
        flex: 1,
        // width:'100%',
        // height: '100vh',
        // borderWidth: 4,
        // borderColor: 'red',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'start'
    },

    welcome_text: {

        fontSize: responsiveFontSize(5),
        marginTop: responsiveHeight(12),
        marginBottom: responsiveHeight(12),
        fontWeight: '900',
        fontStyle: 'normal',
        color: 'gray'
    },
    text: {

        margin: 0,
        // fontSize: 15,
        fontWeight: '500',
        color: 'black',
        textAlign: 'left'
    },

    linkbeforetext: {
        margin: 0,
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        textAlign: 'left'
    },

    btntext: {
        margin: '4%',
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        textAlign: 'left'
    },
    UsernameInputBoxView: {
        marginBottom: responsiveHeight(10),


    },
    PasswordInputBoxView: {

        marginBottom: responsiveHeight(10),

    },
    UsernameInputBox: {
        width: 300,
        height: 50,
        fontSize: 20,
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 5,
    },
    PasswordInputBox: {
        width: 300,
        height: 50,
        fontSize: 20,
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 5,
        marginBottom: 4,
    },
    loginBtn: {
        flex: 1,
        width: 300,
        height: 100,
        color: 'white',
        // borderRadius: 200,
        borderTopEndRadius: 100,
        borderBottomLeftRadius: 100,

        // justifyContent: 'center',
        // alignItems: 'center'
        marginTop: '7',
        // marginBottom: '100'
    },
    LG: {
        borderRadius: 200,
    },
    bottomText: {
        flex: 0.6,
        marginTop: '0%',
        marginBottom: '5%',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        alignSelf: ''
    },
    linkColor: {
        color: 'red'
    }

});