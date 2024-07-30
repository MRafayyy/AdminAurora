import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ip from '../IPaddress';
import Video from 'react-native-video';
import InfoField from '../../components/InfoField';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import colors from '../../utils/color';

export default function Screen_Videos({ navigation, route }) {

    const [videoUrl, setVideoUrl] = useState('');
    //console.log(item._id)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {

        const item = route.params.item;
      //  console.log(item._id)

        const getVideoUrls = async () => {
            try {
                let response = await fetch(`${ip}/women/getVideoUrls/${item._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
           
              // const textResponse = await response.text();
              // console.log('Response:', textResponse);

                response = await response.json();
              //  console.log(response)
               setVideoUrl(response.reverse())


                
            } catch (error) {
                console.log(error);
            }
        };

        getVideoUrls();

    }, [])

    return (
error?
<Text style={styles.errorText}>{error}</Text>:
        <View style={styles.mainContainer}>

        <FlatList
            contentContainerStyle={{
                marginVertical: responsiveHeight(0),
                paddingBottom: responsiveHeight(0),

            }}
          //   refreshControl={
          //    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
           //  }
            data={videoUrl}
            renderItem={({ item }) => {
              //  console.log(item.timeWhenSafeButtonPressed)
                return (
                

                    <TouchableOpacity onPress={()=> navigation.navigate('Screen_PlayVid', {link: item.download_link})} style={styles.container}>

                        {/* <InfoField textColor={colors.white} fieldName={'Download Link'} fieldValue={item.download_link ===undefined? 'Null' :item.download_link} /> */}
                        <InfoField textColor={colors.white} fieldName={'Date'} fieldValue={item.date===undefined? 'Null' :  item.date} />
                       

                    </TouchableOpacity>
                );
            }}
            keyExtractor={(item, index) => index}
        />

    </View>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: 300,
    },

    errorText: {
        color: 'red',
        fontSize: 16,
      },

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
        marginHorizontal: responsiveWidth(6),
        paddingHorizontal: responsiveWidth(0),
    },
});

