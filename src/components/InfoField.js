import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import colors from '../utils/color';
import fontFamily from '../../assets/fontFamily/fontFamily';

export default function InfoField(props) {
  const { textColor, containerWidth } = props;
  return (
    <View style={[styles.fieldContainer, {width: containerWidth || '90%'  }]}>
      <Text style={[styles.fieldLabel, { color: textColor || colors.black }]}>{props.fieldName}</Text>
      <Text style={[styles.fieldValue, { color: textColor || colors.black }]}>{props.fieldValue}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  fieldContainer: {
  //  width: responsiveWidth(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: responsiveWidth(10),
    marginVertical: 10,
  },

  fieldLabel: {
    fontSize: responsiveFontSize(2),
    color: colors.black,
    textAlign: 'center',
    fontFamily: fontFamily.Bold
    //   marginBottom: 5,
  },
  fieldValue: {
    //  width: responsiveWidth(48),
    paddingRight: responsiveWidth(0),
    color: colors.black,
    textAlign: 'left',
    fontFamily: fontFamily.Regular,
    fontSize: responsiveFontSize(2),
  },
})