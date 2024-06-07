import React, { useState, PropsWithChildren, useEffect, useContext } from 'react';
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
  Alert,
} from 'react-native';

import HomeTabs from '../HomeTabs';
import Screen_Home from './Screen_Home';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

// import PushNotification from "react-native-push-notification";

import * as Keychain from 'react-native-keychain';

import ip from './IPaddress';
import { useConnectionStatus } from '../components/NoInternet';
import UserIdContext from '../UserIdContext';
import GlobalStyles from '../utils/GlobalStyles';

export default function Screen_Login({ navigation, route }) {
  const { setUserId } = useContext(UserIdContext);
  const isConnected = useConnectionStatus();

  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const [UsernameText, setUsernameText] = useState('');
  const [PasswordText, setPasswordText] = useState('');
  const [Loader, setLoader] = useState(false);
  const [UsernameError_msg, setUsernameError_msg] = useState(['']);
  const [PasswordError_msg, setPasswordError_msg] = useState(['']);

  const onHandleUsernameChange = value => {
    setUsernameText(value);
  };
  const onHandlePasswordChange = value => {
    setPasswordText(value);
  };

  const goToForgotPasswordScreen = () => {
    navigation.navigate('Screen_ForgotPassword');
  };
  // const GoToRegistrationPage = () => {
  //     navigation.navigate('Screen_Registration')
  // }

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'test-channel',
        channelName: 'Test Channel',
      },
      created => console.log('channel created'),
    );
  };

  const NotificationPermission = () => {
    //this func is for requesting notification permission from user
    const checkApplicationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        } catch (error) { }
      }
    };
    checkApplicationPermission();
  };

  let arr = [];

  const Login = async () => {
    !isConnected
      ? Alert.alert('No Internet', 'Please connect to the internet')
      : // Keyboard.dismiss();
      (arr = []);

    if (UsernameText.trim().length === 0 && PasswordText.trim().length === 0) {
      setUsernameError_msg(['User Id field cannot be empty']);
      setPasswordError_msg(['Password field cannot be empty']);
      return;
    } else if (UsernameText.trim().length === 0) {
      setUsernameError_msg(['User Id field cannot be empty']);
      setPasswordError_msg([]);
      return;
    } else if (PasswordText.trim().length === 0) {
      setPasswordError_msg(['Password field cannot be empty']);
      setUsernameError_msg([]);
      return;
    } else {
      setUsernameError_msg([]);
      setPasswordError_msg([]);
    }

    try {

      setLoader(true);


      let url = `${ip}/admin/login`;


      const LoginData = {
        adminId: UsernameText.trim(),
        password: PasswordText.trim(),
      };
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(LoginData),
      });
      response = await response.json();

      if (response.success === true) {

        setLoader(true);

        try {
          const adminId = UsernameText.trim();
          const password = PasswordText.trim()
          await Keychain.setGenericPassword(adminId, password);

        } catch (error) {
          console.warn(error)
        }

        navigation.navigate(HomeTabs, {
          screen: Screen_Home,
          params: { userId: UsernameText.trim() },
        });

        setUsernameText('');
        setPasswordText('');
        setUsernameError_msg([]);
        setPasswordError_msg([]);
        setLoader(false);

      } else if (response.success === false) {
        Alert.alert('Invalid Error', response.reason, [{ style: 'cancel' }]);
        setLoader(false);
      } else if (response.success === 'FCMTokenError') {
        Alert.alert(response.success, response.reason, [{ style: 'cancel' }]);
        setLoader(false);
      } else if (response.success === 'SomeError') {
        Alert.alert(response.success, response.reason, [{ style: 'cancel' }]);
        setLoader(false);
      }

      // console.log(response);
    } catch (error) {
      Alert.alert('System Error', error.message, [{ style: 'cancel' }]);
      setLoader(false);
      console.info('gggggggggggggggggggggggggg' + error);
    }
  };

  useEffect(() => {
    NotificationPermission();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
        style={{ flex: 1 }}>
        {/* <ScrollView> */}
        <View style={GlobalStyles.body}>
          <Image
            source={require('../../assets/images/login.jpg')}
            style={[
              {
                width: responsiveWidth(100),
                height: responsiveHeight(40),
                resizeMode: 'cover',
                marginBottom: responsiveHeight(6),
              },
            ]}
          />

          <View style={GlobalStyles.UserPassInputBoxView}>
            <TextInput
              editable={!Loader}
              value={UsernameText}
              onChangeText={value => onHandleUsernameChange(value)}
              style={[GlobalStyles.UserPasswInputBox]}
              placeholder="Admin Id"
              placeholderTextColor={'black'}
              onSubmitEditing={Keyboard.dismiss}></TextInput>
            {UsernameError_msg.map((value, index) => (
              <Text
                style={[GlobalStyles.TextInputBelowErrorTextStyle, GlobalStyles.errorFont]}
                key={index}>
                {value}
              </Text>
            ))}
          </View>

          <View style={GlobalStyles.UserPassInputBoxView}>
            <TextInput
              editable={!Loader}
              value={PasswordText}
              onChangeText={value => onHandlePasswordChange(value)}
              style={[GlobalStyles.UserPasswInputBox]}
              placeholder="Password"
              placeholderTextColor={'black'}
              onSubmitEditing={Keyboard.dismiss}></TextInput>
            {PasswordError_msg.map((value, index) => (
              <Text
                style={[GlobalStyles.TextInputBelowErrorTextStyle, GlobalStyles.errorFont]}
                key={index}>
                {value}
              </Text>
            ))}
            <Pressable
              onPress={goToForgotPasswordScreen}
              style={{ marginTop: 10 }}>
              <Text style={[GlobalStyles.text, { textAlign: 'right' }]}>
                Forgot password?
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={Login}
            style={({ pressed }) => [
              pressed ? { opacity: 0.8 } : {},
              GlobalStyles.loginBtn,
              { borderRadius: 100 },
            ]}
            disabled={Loader}>
            {Loader ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={[GlobalStyles.btntext]}>
                {' '}
                Login
              </Text>
            )}
          </Pressable>
        </View>
        {/* </ScrollView> */}
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
});
