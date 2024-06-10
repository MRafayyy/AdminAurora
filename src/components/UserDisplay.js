import {useContext, useEffect, useState} from 'react';
import React from 'react';

import {Text, View, Pressable, Image, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import ip from '../screens/IPaddress';
import colors from '../utils/color';
import fontFamily from '../../assets/fontFamily/fontFamily';

const UserDisplay = ({item, navigation, screen}) => {
  const [disableNow, setdisableNow] = useState(false);

  // const [requestSent, setrequestSent] = useState({sel: false})

const GoToInfoPage = () =>{
    navigation.navigate(screen, {item: item})
  }

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(5),
      }}
      onPress={GoToInfoPage}>
      <View>
        <Image
          style={{
            width: responsiveWidth(14),
            height: responsiveHeight(7),
            resizeMode: 'cover',
          }}
          source={require('../../assets/images/womenAvatar.jpg')}
        />
      </View>

      <View style={{marginLeft: responsiveWidth(5), flex: 1}}>
        <Text
          style={styles.text}>
          {item.name}
        </Text>
        {/* <Text style={{ textAlign: 'left', color: 'gray', fontSize: responsiveFontSize(2) }} >{item.userId}</Text> */}
      </View>

      <Pressable
        disabled={disableNow}
        style={{
          borderColor: '#0662bf',
          borderWidth: 1,
          padding: responsiveWidth(0),
          borderRadius: 100,
          width: responsiveWidth(2),
          height: responsiveHeight(1),
          marginRight: responsiveWidth(7),
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#0662bf',
            fontSize: responsiveFontSize(2),
            backgroundColor: item.is_online === 1 ? 'green' : 'red',
          }}></Text>
      </Pressable>
    </Pressable>
  );
};

export default UserDisplay;

const styles = StyleSheet.create({
  text:{
    
      textAlign: 'left',
      color: colors.black,
      fontSize: responsiveFontSize(2),
      fontFamily: fontFamily.Regular
    
  }
});
