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
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import ip from './IPaddress';
import colors from '../utils/color';
import InfoField from '../components/InfoField';
import fontFamily from '../../assets/fontFamily/fontFamily';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Screen_FirebaseNotif({ navigation, route }) {

    const [TitleText, setTitleText] = useState('');
    const [MessageText, setMessageText] = useState('');
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



    const sendFCMNotifs = async () => {
        setLoader(true)
        try {
            let url = `${ip}/sendFCM`
            if (TitleText.length === 0 || MessageText.length === 0) {
                Alert.alert("Empty fields")
                setLoader(false)
            }
            else {
                let notifData = {
                    title: TitleText.trim(),
                    body: MessageText.trim()
                }
                Alert.alert("Success", "Notification was sent to all users")
                setLoader(false)
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(notifData)
                })

            }
        } catch (error) {
            setLoader(false)

        }
    }




    return (
        <>
            <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
                style={{ flex: 1, backgroundColor: colors.white }}>
                <ScrollView contentContainerStyle={styles.container}>

                    <View style={styles.notifContainer}>

                        <Text
                            style={{
                                fontFamily: fontFamily.SemiBold,
                                fontSize: responsiveFontSize(6),
                                color: colors.blue,
                                marginBottom: responsiveHeight(10)
                            }}
                        >Notifications</Text>


                        <TextInput
                            onChangeText={value => setTitleText(value)}
                            value={TitleText}
                            style={styles.inputBox}
                            placeholderTextColor={colors.darksilver}
                            placeholder="notification title"
                        />
                        <TextInput
                            onChangeText={value => setMessageText(value)}
                            value={MessageText}
                            style={styles.inputBox}
                            placeholderTextColor={colors.darksilver}
                            placeholder="notification body"
                        />


                        <Pressable
                            disabled={Loader}
                            onPress={sendFCMNotifs}
                            style={[
                                styles.trackBtn,
                                { backgroundColor: colors.orange },
                            ]}>
                            <Text style={styles.text}>
                                Send Notification
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}




const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: responsiveWidth(4),
        justifyContent: 'flex-start',
        // marginHorizontal: responsiveWidth(12),
        paddingTop: responsiveHeight(4),
        alignItems: 'center',
        backgroundColor: 'white',
    },
    fieldContainer: {
        width: responsiveWidth(85),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: responsiveWidth(10),
        marginBottom: 20,
        paddingRight: responsiveWidth(5),
    },
    fieldLabel: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.Bold,
        color: colors.black,
        textAlign: 'center',
        //   marginBottom: 5,
    },
    fieldValue: {
        paddingRight: responsiveWidth(10),
        color: colors.black,
        fontFamily: fontFamily.Regular,
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
    },

    trackBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(2),
        width: responsiveWidth(60),
        height: responsiveHeight(6),
        borderRadius: 50,
        backgroundColor: 'orange',
    },
    notifBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: responsiveFontSize(2),
        marginTop: responsiveHeight(2),
        width: responsiveWidth(60),
        height: responsiveHeight(6),
        borderRadius: 50,
        backgroundColor: 'orange',
    },

    inputBox: {
        // backgroundColor: 'lightgrey',
        margin: responsiveHeight(2),
        width: responsiveWidth(80),
        height: responsiveHeight(7),
        fontSize: responsiveFontSize(2),
        color: colors.black,
        borderColor: 'grey',
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(6),
        borderRadius: 10,
        borderWidth: 2,
        fontFamily: fontFamily.Regular,
        lineHeight: responsiveHeight(2.5)
    },

    notifContainer: {
        marginTop: responsiveHeight(10),
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: colors.white,
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.Regular,
        lineHeight: responsiveHeight(2.7)
    },
});
