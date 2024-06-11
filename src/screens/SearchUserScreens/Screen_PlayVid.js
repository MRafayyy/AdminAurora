import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../utils/color';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Video from 'react-native-video';

export default function Screen_PlayVid({route}) {
const [vidSource, setVideSource] = useState(route.params.link)

    useEffect

    const [loading, setLoading] = useState(false);

  return (
     <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Video
                    source={{ uri: vidSource }}
                    style={styles.video}
                    controls={true}
                    paused={false}
                    
                    resizeMode="contain"
                />
            )}
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
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    mainContainer: {
        backgroundColor: colors.white
    },

});