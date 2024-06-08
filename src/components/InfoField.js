import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'

export default function InfoField(props) {
    const {color} = props;
  return (
    <View style={styles.fieldContainer}>
    <Text style={[styles.fieldLabel,{color: color} ]}>{props.fieldName}</Text>
    <Text style={[styles.fieldValue, {color: color}]}>{props.fieldValue}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    fieldContainer: {
        width: responsiveWidth(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: responsiveWidth(10),
        marginVertical: 10,
        paddingRight: responsiveWidth(0)
      },
      fieldLabel: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        //   marginBottom: 5,
      },
      fieldValue: {
      //  width: responsiveWidth(48),
        paddingRight: responsiveWidth(0),
        color: 'black',
        textAlign: 'left',
        fontSize: responsiveFontSize(2),
      },
})