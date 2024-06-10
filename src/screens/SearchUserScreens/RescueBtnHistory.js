import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import ip from '../IPaddress';
import colors from '../../utils/color';
import InfoField from '../../components/InfoField';
import { RefreshControl } from 'react-native';

export default function RescueBtnHistory({ navigation, route }) {

    const [rescueData, setRescueData] = useState(null)
    const items = route.params.item;
    const [refreshing, setRefreshing] = useState(false);

const onRefresh =async()=>{
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    try {
        let response = await fetch(`${ip}/getRescueHistory/${items._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        response = await response.json();
  
      if(response.ok){
        setRescueData(response)
      }
      } catch (error) {
        console.log(error);
      }
}


    return (
        <View style={styles.mainContainer}>

            <FlatList
                contentContainerStyle={{
                    marginVertical: responsiveHeight(0),
                    paddingBottom: responsiveHeight(0),

                }}
                 refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                 }
                data={rescueData===null? items.reverse(): rescueData}
                renderItem={({ item }) => {
                    return (
                        // <Text>{item.timeWhenRescueButtonPressed}</Text>

                        <View style={styles.container}>

                            <InfoField textColor={colors.white} fieldName={'Rescue Press Time'} fieldValue={item.timeWhenRescueButtonPressed} />
                            <InfoField textColor={colors.white} fieldName={'Date'} fieldValue={item.dateWhenRescueButtonPressed} />
                            {/* <InfoField fieldName={'locationWhereRescuePressed'} fieldValue={item.locationWhereRescuePressed} /> */}
                            <InfoField textColor={colors.white} fieldName={'Safe Pressed'} fieldValue={item.safeButtonPressed} />
                            <InfoField textColor={colors.white} fieldName={'Safe Press Time'} fieldValue={item.timeWhenSafeButtonPressed} />
                            <InfoField textColor={colors.white} fieldName={'Date'} fieldValue={item.dateWhenSafeButtonPressed} />
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
        backgroundColor: colors.white
    },

    container: {
        backgroundColor: colors.white,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.orange,
        marginVertical: responsiveHeight(2),
        paddingVertical: responsiveHeight(2),
        borderRadius: 40,
        marginHorizontal: responsiveWidth(5),
        paddingHorizontal: responsiveWidth(1),
    },

})