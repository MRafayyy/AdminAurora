import {View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ip from '../IPaddress';
import colors from '../../utils/color';

export default function Screen_UsersInfo({navigation, route}) {

  const [TitleText, setTitleText] = useState('');
  const [MessageText, setMessageText] = useState('');
  const [Loader, setLoader] = useState(false);
  const item = route.params.item;


  const [tracking, setTracking] = useState(false);
  const [receivedLocation, setReceivedLocation] = useState();

  const getRescueStatus = async () => {
    let response = await fetch(`${ip}/getRescueButtonStatus/${item._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    response = await response.json();

    if (response.status === true) {
      setTracking(true);
      setReceivedLocation(response.location);
    }
  };

  useEffect(() => {
    getRescueStatus();
  }, []);

  console.log(item._id)
  // console.log(item.is_online)
  const GoToTrackingPage = () => {
    navigation.navigate('Screen_Maps', {
      item: item._id,
      receivedLocation: receivedLocation,
    });
  };








  const sendNotif = async () => {
    setLoader(true)
    try {
      const url = `${ip}/sendToOne/${item._id}`;

      if (TitleText.length === 0 || MessageText.length === 0) {
        Alert.alert('Empty fields');
        setLoader(false);
      } else {
        const data = {
          title: TitleText.trim(),
          body: MessageText.trim(),
        };
        Alert.alert("Success", "Notification was sent to all users")
        setLoader(false)
        let response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });
        response = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={{ flex: 1 }} >

    <View style={styles.container}>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Name</Text>
        <Text style={styles.fieldValue}>{item.name}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email </Text>
        <Text style={styles.fieldValue}>{item.email}</Text>
      </View>

      <Pressable onPress={GoToTrackingPage} style={[styles.trackBtn,{backgroundColor: tracking? colors.green: colors.orange}]}>
        <Text style={{color: colors.white, fontSize: responsiveFontSize(2)}}>
          {tracking? 'Track': 'No Tracking Available'}
        </Text>
      </Pressable>

      <View style={styles.notifContainer}>
        {/* <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: responsiveFontSize(2.3),
            fontWeight: '900'
          }}>
          Send notifications to user
        </Text> */}
        <TextInput
          onChangeText={value => setTitleText(value)}
          value={TitleText}
          style={styles.inputBox}
          placeholderTextColor={'grey'}
          placeholder="notification title"
        />
        <TextInput
          onChangeText={value => setMessageText(value)}
          value={MessageText}
          style={styles.inputBox}
          placeholderTextColor={'grey'}
          placeholder="notification body"
          />
        <Pressable
          disabled={Loader}
          onPress={sendNotif}
          style={styles.notifBtn}>
          <Text style={{fontSize: responsiveFontSize(2), color: 'black'}}>
            Send Notification
          </Text>
        </Pressable>
      </View>
    </View>
</KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: responsiveWidth(4),
    justifyContent: 'flex-start',
    // marginHorizontal: responsiveWidth(12),
    paddingTop: responsiveHeight(10),
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
    paddingRight: responsiveWidth(5)
  },
  fieldLabel: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    //   marginBottom: 5,
  },
  fieldValue: {
    paddingRight: responsiveWidth(10),
    color: 'black',
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

    color: 'black',
    borderColor: 'grey',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: 20,
    borderWidth: 2,
  },

  notifContainer: {
    marginTop: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
