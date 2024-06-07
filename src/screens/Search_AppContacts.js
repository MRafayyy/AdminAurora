import React, { useEffect, useState, useContext, useCallback } from 'react';

import {
    View,
    Pressable,
    StyleSheet,
    BackHandler,
    FlatList,
    RefreshControl,
    refreshing,
    TextInput,
    Image,
    Text,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

import ip from './IPaddress';

import UserDisplay from '../components/UserDisplay';
import socket from '../components/SocketServiceAdmin';
import fontFamily from '../../assets/fontFamily/fontFamily';
import GlobalStyles from '../utils/GlobalStyles';
import colors from '../utils/color';


export default function Search_AppContacts({ navigation }) {

    const [searchText, setSearchText] = useState('');
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const [AllUsers, setAllUsers] = useState([]);
    const [AllUsers2, setAllUsers2] = useState([]);


    const fetchUsers = async () => {
        try {
            let response = await fetch(`${ip}/admin/getAllContactUsers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            response = await response.json();
            setAllUsers(response);
            setAllUsers2(response);
        } catch (error) {
            console.log('error here ');
            console.log(error);
        }
    };

    useEffect(() => {
        socket.on('aUserGotOnline', () => {
            fetchUsers();
        });
        socket.on('aUserGotOffline', () => {
            fetchUsers();
        });

        return () => {
            socket.off('aUserGotOnline');
            socket.off('aUserGotOffline');
        };
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            fetchUsers();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        fetchUsers();
    }, []);

    function handleBackButtonClick() {
        navigation.navigate('Screen_Home');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);

    const handleOnChangeText = text => {
        setSearchText(text);
    };

    const onSearch = text => {
        const searchText = text.trim().toLowerCase();


        if (searchText === '') {

            setAllUsers(AllUsers2);
        } else {
            let tempList = AllUsers2.filter(item => {
                if (item.name && typeof item.name === 'string') {
                    return item.name.toLowerCase().startsWith(searchText);

                }
                return false;
            });


            setAllUsers(tempList);
        }

    };



    return (
        <>
            <View style={styles.body}>


                <View style={styles.headerContainer}>


                    <MaterialCommunityIcons
                        name="arrow-left"
                        // name="chatbox-ellipses"
                        size={30}
                        color={colors.blue}
                        onPress={() => navigation.goBack()}
                    />


                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.5),lineHeight: responsiveHeight(3.3) }]}>Contact Users</Text>


                </View>


                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: responsiveHeight(3),
                    }}>
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            // justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: responsiveWidth(89),
                            height: responsiveHeight(6),
                            borderWidth: 1,
                            paddingHorizontal: responsiveWidth(3),
                            borderColor: 'gray',
                            borderRadius: 20,
                        }}>
                        <Image
                            source={require('../../assets/images/icons8-search-50.png')}
                            style={{
                                marginRight: responsiveWidth(1),
                                width: responsiveWidth(6),
                                height: responsiveWidth(6),
                            }}
                        />
                        <TextInput
                            style={[GlobalStyles.textInputInsideHomeScreens]}
                            value={searchText}
                            onChangeText={text => {
                                handleOnChangeText(text);
                                onSearch(text);
                            }}
                            placeholder="search name here..."></TextInput>
                    </Pressable>
                </View>


                {
                    <FlatList
                        style={{
                            marginTop: responsiveHeight(4),
                            paddingBottom: responsiveHeight(10),
                        }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        data={AllUsers}
                        renderItem={({ item }) => {
                            return <UserDisplay item={item} navigation={navigation} />;
                        }}
                        keyExtractor={(item, index) => index}
                    />
                }

            </View>


        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },

    text: {
        fontFamily: fontFamily.Regular,
        margin: 5,
        fontSize: 15,
        color: 'black',
        textAlign: 'left',
    },
    headerContainer: {
        marginTop: responsiveHeight(2),
        // alignSelf: 'flex-end',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(16),
        paddingHorizontal: responsiveWidth(6),
        paddingRight: responsiveWidth(6),
    },

    UsernameInputBox: {
        width: responsiveWidth(80),
        height: responsiveHeight(6),
        fontSize: responsiveFontSize(2),
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
    },
});
