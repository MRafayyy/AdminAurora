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


    useEffect(() => {

        const item = route.params.item;
        console.log(item._id)
        const getVideoUrls = async () => {
            try {
                let response = await fetch(`${ip}/women/getVideoUrls/${item._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

               // const url = await storage().ref('Rafay/video-2024-06-11 01:49 AM.mov').getDownloadURL();
           
              // const textResponse = await response.text();
              // console.log('Response:', textResponse);

                response = await response.json();
              //  console.log(response)
               setVideoUrl(response.reverse())

               
                 //   setVideoUrl(response[0].download_url);
                   // setLoading(false)
                
            } catch (error) {
                console.log(error);
            }
        };

        getVideoUrls();

    }, [])

    return (

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



        // <View style={styles.container}>
        //     {loading ? (
        //         <ActivityIndicator size="large" color="#0000ff" />
        //     ) : (
        //         <Video
        //             source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/aurora-51db1.appspot.com/o/Rafay%2Fvideo-2024-06-11%2003%3A13%20AM.mov?alt=media&token=dd33ea31-9878-41ed-8feb-80683ec5264d' }}
        //             style={styles.video}
        //             controls={true}
        //             paused={false}
                    
        //             resizeMode="contain"
        //         />
        //     )}
        // </View>
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
        marginHorizontal: responsiveWidth(1),
        paddingHorizontal: responsiveWidth(0),
    },
});

