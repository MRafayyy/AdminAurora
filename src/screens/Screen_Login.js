import React, { useState, PropsWithChildren, useEffect, useContext } from "react";
// import type { PropsWithChildren } from 'react';
// import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import EncryptedStorage from 'react-native-encrypted-storage'
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Button,
    PermissionsAndroid,
    Platform,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Keyboard,
    BackHandler,
    Alert
} from 'react-native';

import HomeTabs from "../HomeTabs";
import Screen_Home from "./Screen_Home";




import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

// import PushNotification from "react-native-push-notification";



import * as Keychain from 'react-native-keychain';

import ip from './IPaddress';
import { useConnectionStatus } from "../components/NoInternet";
import UserIdContext from "../UserIdContext";


export default function Screen_Login({ navigation, route }) {

   
    const { setUserId } = useContext(UserIdContext);


    // const [user, setUser] = useMMKVStorage('user', storage, 'robert');

    const isConnected = useConnectionStatus();


    function handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    const [UsernameText, setUsernameText] = useState('');
    const [PasswordText, setPasswordText] = useState('');
    const [Loader, setLoader] = useState(false);
    const [UsernameError_msg, setUsernameError_msg] = useState(['']);
    const [PasswordError_msg, setPasswordError_msg] = useState(['']);

    const onHandleUsernameChange = (value) => {
        setUsernameText(value);

    }
    const onHandlePasswordChange = (value) => {
        setPasswordText(value);
    }

    const goToForgotPasswordScreen = () => {
        navigation.navigate('Screen_ForgotPassword')
    }
    // const GoToRegistrationPage = () => {
    //     navigation.navigate('Screen_Registration')
    // }
  




    const createChannels = () => {
        PushNotification.createChannel({
            channelId: "test-channel",
            channelName: "Test Channel"
        },
            (created) => console.log("channel created")
        )
    }

    const NotificationPermission = () => { //this func is for requesting notification permission from user
        const checkApplicationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    );
                } catch (error) {
                }
            }
        };
        checkApplicationPermission();
    }



    let arr = [];

    const Login = async () => {

        !isConnected ? Alert.alert('No Internet', 'Please connect to the internet') :

            // Keyboard.dismiss();
            arr = [];

        if (UsernameText.trim().length === 0 && PasswordText.trim().length === 0) {
            setUsernameError_msg(['User Id field cannot be empty'])
            setPasswordError_msg(['Password field cannot be empty'])
            return
        }
        else if (UsernameText.trim().length === 0) {
            setUsernameError_msg(['User Id field cannot be empty'])
            setPasswordError_msg([]);
            return
        }
        else if (PasswordText.trim().length === 0) {
            setPasswordError_msg(['Password field cannot be empty'])
            setUsernameError_msg([]);
            return
        }
        else {
            setUsernameError_msg([]);
            setPasswordError_msg([]);
        }







        try {
            // try {
            setLoader(true)
            // await messaging().registerDeviceForRemoteMessages();
            // const FcmDeviceToken = await messaging().getToken();
            // FcmDeviceToken = token
            // let url = 'http://192.168.0.103:3000/login'
            let url = `${ip}/admin/login`
            // console.log(FcmDeviceToken)

            const LoginData = {
                adminId: UsernameText.trim(),
                password: PasswordText.trim(),
                // FcmDeviceToken: FcmDeviceToken
            }
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(LoginData)
            })

            // console.log("response before jsoning : " + response)
            response = await response.json();
            // console.log("response after jsoning : " + response)

            // } catch (error) {
            //     setLoader(false)
            //     Alert.alert("Could not get device token Error", 'Error may be generated if you are not connected to the internet', [{ style: 'cancel' }])
            // }



            if (response.success === true) {
                setLoader(true)
                // try {
                //     const username =  UsernameText.trim()
                //     const password = (response.token).toString();
                //     console.info("token is:" + response.token)
                //     // await AsyncStorage.setItem('Token', response.token)
                //     await Keychain.setGenericPassword(username, password)
                // } catch (error) {
                //     setLoader(false)
                //     console.info("ggggggggggggggggggggggggggaaaaaaaaaaaa" + error)
                //     Alert.alert("Keychain Error", error.message, [{ style: 'cancel' }])
                // }


        
                // try {
                //     await EncryptedStorage.setItem(
                //         "user_session",
                        
                //             response.mongoId
                       
                //     );

              
                // } catch (error) {
                //     console.log("Encryptes storage error: " + error)
                    
                // }

                setUserId({ userId: UsernameText.trim(), mongoId: response.mongoId});
                navigation.navigate(HomeTabs, { screen: Screen_Home, params: { userId: UsernameText.trim() } })
                setUsernameText('');
                setPasswordText('');
                setUsernameError_msg([])
                setPasswordError_msg([])
                setLoader(false)
            }

            else if (response.success === false) {
                Alert.alert("Invalid Error", response.reason, [{ style: 'cancel' }])
                setLoader(false)
            }

            else if (response.success === "FCMTokenError") {

                Alert.alert(response.success, response.reason, [{ style: 'cancel' }])
                setLoader(false)
            }
            else if (response.success === "SomeError") {

                Alert.alert(response.success, response.reason, [{ style: 'cancel' }])
                setLoader(false)
            }

            // console.log(response);
        } catch (error) {
            Alert.alert("System Error", error.message, [{ style: 'cancel' }])
            setLoader(false)
            console.info("gggggggggggggggggggggggggg" + error)
        }
    }


    useEffect(() => {
        NotificationPermission();
        // createChannels();
    }, [])



    return (
        <>
            <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={{ flex: 1 }} >
                {/* <ScrollView> */}
                <View style={styles.body}>

                    <Image source={require('../../assets/images/login.jpg')} style={[{ width: responsiveWidth(100), height: responsiveHeight(40), resizeMode: 'cover', marginBottom: responsiveHeight(6) }]} />

                

                    <View style={styles.UsernameInputBoxView}>
                        <TextInput editable={!Loader} value={UsernameText} onChangeText={(value) => onHandleUsernameChange(value)} style={[styles.UsernameInputBox, { color: 'black' }]} placeholder='Admin Id' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {UsernameError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                    </View>

                    <View style={styles.PasswordInputBoxView}>
                        <TextInput editable={!Loader} value={PasswordText} onChangeText={(value) => onHandlePasswordChange(value)} style={[styles.PasswordInputBox, { color: 'black' }]} placeholder='Password' placeholderTextColor={'black'} onSubmitEditing={Keyboard.dismiss} ></TextInput>
                        {PasswordError_msg.map((value, index) => (
                            <Text style={{ color: 'red', marginTop: 2, fontSize: responsiveFontSize(1.2) }} key={index}>{value}</Text>
                        ))}
                        <Pressable onPress={goToForgotPasswordScreen} style={{ marginTop: 10 }}><Text style={[styles.text, { textAlign: 'right' }]}>Forgot password?</Text></Pressable>
                    </View>




                    <Pressable onPress={Login} style={({ pressed }) => [pressed ? { opacity: 0.8 } : {}, styles.loginBtn, { borderRadius: 100 }]} disabled={Loader}>

                        {Loader ? <ActivityIndicator size='large' color="#fff" /> : <Text style={[styles.btntext, { textAlign: 'center' }]}> Login</Text>}
                    </Pressable>


                  


                </View>
                {/* </ScrollView> */}
                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </>
    )
}




const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    text: {
        fontSize: responsiveFontSize(1.5),
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
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        color: 'white',
        textAlign: 'left'
    },

    UsernameInputBoxView: {
        marginBottom: responsiveHeight(4),

    },
    PasswordInputBoxView: {
        marginBottom: responsiveHeight(4),
    },

    UsernameInputBox: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
    },
    PasswordInputBox: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
        // marginBottom: responsiveHeight(1),
    },

    loginBtn: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        color: 'white',
        backgroundColor: '#0662bf',
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7',
    },

    bottomText: {
        marginTop: responsiveHeight(15),
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        alignSelf: '',

    },
    linkColor: {
        color: 'red',
        fontSize: responsiveFontSize(1.5)
    }

});