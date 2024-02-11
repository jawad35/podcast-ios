import { View, Text, Image, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import CustomButtons from '../../components/Items/CustomButtons'
import { LoginController } from '../../components/Controllers/LoginController'
import { SetOverlay, SetUserData } from '../../redux/PodcastUsers'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { SignUpController } from '../../components/Controllers/SignUpController'
import AsyncStorage from '@react-native-async-storage/async-storage'

const StartTrial = ({ route }) => {
    const { email, password, fullname, role, isSocailLogin, categories } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const CreatUser = async () => {
        const res = await SignUpController(fullname, email, password, role, categories, null, navigation, isSocailLogin, setIsLoading)
        if (res?.isExist) {
            await LoginController(email, password, navigation, isSocailLogin, dispatch, setIsLoading)
        } else {
            if (res?.success) {
                await AsyncStorage.setItem('isLogged', res?.user._id)
                dispatch(SetOverlay(false))
                dispatch(SetUserData(res?.user))
                setIsLoading(false)
                navigation.navigate('Parent')
            }

        }
    }
    return (
        <SafeAreaView className='flex justify-center bg-black flex-1'>
            <View className='p-4 m-4 flex items-center' style={{ marginVertical: scale(30) }}>
                <Image source={{ uri: 'https://res.cloudinary.com/dqmoofr4j/image/upload/v1705575882/podcast/main_logo_podcast_ijvnjv.jpg' }}
                    style={{ height: scale(120), width: scale(120) }}
                    resizeMode='cover'
                    className='rounded-full'
                />
                
                <Text style={{ fontSize: scale(25) }} className='text-white_color text-center font-bold'>{role === 1 ? 'Embark' : 'Unleash'}</Text>
                <Text style={{ fontSize: scale(20) }} className='text-brown_darker text-center'>{role === 1 ? "on Limitless Listening" : "Your Podcasting Journey" }</Text>
                <Text style={{ fontSize: scale(15) }} className='bg-white_color my-4 p-2 rounded-md text-center'>{role === 1 ? "Start Your Free Journey Today and Dive into a World of Podcast Discovery!" : "Dive into a World of Free Expression. Start Your Free Trial, Share Your Voice, and Connect with Your Audience!"}</Text>
                <CustomButtons isLoading={isLoading} disable={isLoading} onClick={() => CreatUser()} title={role === 1 ? "Start" : "Start Free Trial"} textColor={'white_color'} color={'brown_darker'} />
            </View>
        </SafeAreaView>
    )
}

export default StartTrial