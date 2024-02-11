import { View, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButtons from '../../components/Items/CustomButtons'
import { useDispatch } from 'react-redux'
import { StackActions, useNavigation } from '@react-navigation/native'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SetUserData } from '../../redux/PodcastUsers'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Logout = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleLogout = async () => {
        if (GoogleSignin.isSignedIn) {
            await AsyncStorage.removeItem('isLogged')
            await GoogleSignin.signOut()
            dispatch(SetUserData([]))
            navigation.dispatch(StackActions.popToTop())
            navigation.navigate('Login')
        }
    }
    return (
        <SafeAreaView className='flex-1'>
            <HeaderTitle icon={true} title={"Logout"} />
            <View className='flex-1 justify-center items-center mx-8'>
                <CustomButtons color={'white_color'} textColor={'black'} title={"Logout"} onClick={handleLogout} />
            </View>
        </SafeAreaView>

    )
}

export default Logout