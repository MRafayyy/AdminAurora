import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import ip from '../IPaddress';
import colors from '../../utils/color';
import InfoField from '../../components/InfoField';

export default function RescueBtnHistory({ navigation, route }) {

    const items = route.params.item;

    return (
        <View style={styles.mainContainer}>

        <FlatList
            contentContainerStyle={{
                marginVertical: responsiveHeight(0),
                paddingBottom: responsiveHeight(0),
                }}
                // refreshControl={
            //  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            data={items}
            renderItem={({ item }) => {
                return (
                    // <Text>{item.timeWhenRescueButtonPressed}</Text>

                    <View style={styles.container}>

                        <InfoField  color={colors.white} fieldName={'timeWhenRescueButtonPressed'} fieldValue={item.timeWhenRescueButtonPressed} />
                        <InfoField  color={colors.white}fieldName={'dateWhenRescueButtonPressed'} fieldValue={item.dateWhenRescueButtonPressed} />
                       {/* <InfoField fieldName={'locationWhereRescuePressed'} fieldValue={item.locationWhereRescuePressed} /> */}
                        <InfoField color={colors.white} fieldName={'safeButtonPressed'} fieldValue={item.safeButtonPressed} />
                        <InfoField color={colors.white} fieldName={'timeWhenSafeButtonPressed'} fieldValue={item.timeWhenSafeButtonPressed} />
                        <InfoField color={colors.white} fieldName={'dateWhenSafeButtonPressed'} fieldValue={item.dateWhenSafeButtonPressed} />
                       {/* <InfoField fieldName={'locationWhereSafeButtonPressed'} fieldValue={item.locationWhereSafeButtonPressed} /> */}

                    </View>
                );
                }}
                keyExtractor={(item, index) => index}
                />

                </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {

    },

    container: {
        // flex: 1,
        marginVertical: responsiveHeight(2),
        borderRadius: 20,
        marginHorizontal: responsiveWidth(1),
        paddingHorizontal: responsiveWidth(2),
        justifyContent: 'flex-start',
        // marginHorizontal: responsiveWidth(12),
        paddingVertical: responsiveHeight(2),
        alignItems: 'center',
        backgroundColor: colors.blue,
    },

})