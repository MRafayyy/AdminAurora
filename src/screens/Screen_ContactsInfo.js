import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    ScrollView,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import ip from './IPaddress';
  import colors from '../utils/color';
  import InfoField from '../components/InfoField';
  import fontFamily from '../../assets/fontFamily/fontFamily';
  
  export default function Screen_ContactsInfo({ navigation, route }) {
    const item = route.params.item;
    const [TitleText, setTitleText] = useState('');
    const [MessageText, setMessageText] = useState('');
    const [Loader, setLoader] = useState(false);


  

  
  
    const sendNotif = async () => {
      setLoader(true);
      try {
        const url = `${ip}/sendToOneContact/${item._id}`;
  
        if (TitleText.length === 0 || MessageText.length === 0) {
          Alert.alert('Empty fields');
          setLoader(false);
        } else {
          const data = {
            title: TitleText.trim(),
            body: MessageText.trim(),
          };
          Alert.alert('Success', 'Notification was sent to the user');
          setLoader(false);
          let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          response = await response.json();
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
        style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView contentContainerStyle={styles.container}>
          
          <InfoField fieldName={'Name'} fieldValue={item.name} />
          <InfoField  fieldName={'Email'} fieldValue={item.email} />
  
          <InfoField fieldName={'Name'} fieldValue={item.name} />
  
  
          <View style={styles.notifContainer}>
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
            onPress={sendNotif}
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
    );
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
  