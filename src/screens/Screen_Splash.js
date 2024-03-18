import React, { useState, useEffect, } from "react";

import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    BackHandler
} from 'react-native';

import * as Keychain from 'react-native-keychain';

import ip from './IPaddress';
import HomeTabs from "../HomeTabs";
import Screen_Home from "./Screen_Home";





export default function Screen_Splash({ navigation, route }) {


    // setTimeout(()=>{

    //     // const Forward = ()=>{
    //         navigation.navigate('Screen_Login');
            
    //         // }

    // }, 4000)

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


    useEffect(() => {
        
        async function Logged() {
            try {
                let url = `${ip}/admin/login`
                const credentials = await Keychain.getGenericPassword();
                console.log("cmon")
                console.log(credentials)
                const LoginData = {
                    adminId: credentials.username,
                    password: credentials.password,
                    // FcmDeviceToken: FcmDeviceToken
                  };
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(LoginData)
                })
                //    console.log(response.text())
                response = await response.json();
console.log(response)
                
                if (response.success === true) {
                   console.log("true here")
                 
                    // setUserId({userId: UsernameText.trim(), mongoId: response.mongoId});
                    navigation.navigate(HomeTabs, {
                      screen: Screen_Home,
                      params: {userId: credentials.username},
                    });
                //    const socket = connectToSocket(credentials.username, mongoId)
                //     socket.emit('LoggedIn',{ userId: credentials.username, mongoId: mongoId} )
                }
                else if (response.success === false) {
                    
                    setTimeout(()=>{

                        // const Forward = ()=>{
                            navigation.navigate('Screen_Login');
                            
                            // }
                
                    }, 3000)
                }

            } catch (error) {
                // console.info(error)
                setTimeout(()=>{

                    // const Forward = ()=>{
                        navigation.navigate('Screen_Login');
                        
                        // }
            
                }, 3000)
            }
        }
        Logged();

        // Login();
    }, [])


    return (
        <>
<View style={styles.body}>
    <Text style={[styles.text]}>Aurora</Text>
    {/* <Pressable onPress={Logout} style={{backgroundColor: 'orange'}}>
        <Text style={styles.text}>Logout</Text>
    </Pressable> */}
</View>
        </>
    )
}




const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        margin: 10,
        fontSize: 70,
        // fontWeight: '600',
        color: 'black',
        textAlign: 'center'
    },

});