import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SetUserData } from '../../redux/PodcastUsers'
import { useDispatch } from 'react-redux'
import { ApiUrl } from '../../constants/globalUrl'
import LottieView from 'lottie-react-native'
import { ActivityIndicator } from 'react-native'
export default function WelcomeScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const GetUser = async () => {
        const userid = await AsyncStorage.getItem('isLogged')
        if (userid) {
            const response = await ApiUrl.post(`/api/user/getuser`, { userid: userid }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.data.success) {
                dispatch(SetUserData(response.data.user[0]))
                navigation.navigate('Parent')
            }
        } else {
            setIsLoading(true)
        }
    }
    useEffect(() => {
        GetUser()
    }, []);
    if (!isLoading) {
        return <SafeAreaView className='flex-1 bg-black justify-center items-center'>
            <Text className='text-white_color'><ActivityIndicator color={'white'} size={40}/></Text>
            {/* <LottieView source={require('../../assets/lottiefiles/dots.json')} autoPlay loop /> */}
        </SafeAreaView>
    }
    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 flex justify-around my-4">
                <Text
                    onPress={async () => {
                        await GoogleSignin.revokeAccess()
                    }}
                    className="text-white_color font-bold text-4xl text-center">
                     Let's Get Started!k
                </Text>

                <View className="flex-row justify-center">
                    <Image source={require("../../assets/icons/podcastpng.png")}
                        style={{ width: responsiveWidth(100), height: responsiveHeight(40) }} />
                </View>
                <View className="space-y-4">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-brown_darker"
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-white_color text-base font-semibold">Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="font-semibold text-base text-brown_darker"> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}