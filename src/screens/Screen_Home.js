import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import * as Keychain from 'react-native-keychain';
export default function Screen_Home({navigation}) {

  const logout = async()=>{
    await Keychain.resetGenericPassword();
navigation.navigate('Screen_Login')
  }
  return (
    <View style={styles}>
      <Text>Screen_Home</Text>
      <Pressable onPress={async()=>{
      logout()
        
      }}><Text style={{color: 'black'}} >Log out</Text></Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})