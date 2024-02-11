import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { ShadowCardStyle } from '../../styles/showcard';
import CustomButtons from '../../components/Items/CustomButtons';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSignInButton from '../../components/socialLoginButtons/GoogleSignInButton';
import { LoginController } from '../../components/Controllers/LoginController';
import { scale } from 'react-native-size-matters';
import OverlayLoading from '../../components/Items/OverlayLoading';



export default function LoginScreen() {
    const navigation = useNavigation();
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const podcastData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const LoginUser = () => {
        LoginController(email, password, navigation, false, dispatch, setIsLoading)
    };

    return (
        <ScrollView className="flex-1 bg-black" contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(6) }}>
            <SafeAreaView className="flex">
                <PodCastTitleLogo />
            </SafeAreaView>
            {
                podcastData?.isoverlay && <OverlayLoading />
            }
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='text-white_color text-xl font-bold'>
                        Login to Your Account
                    </Text>
                    <View className='mt-7 bg-white_color text-black rounded-md'>
                        <TextInput
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            autoCapitalize='none'
                            placeholderTextColor={'black'}
                            style={{color:'black', padding:scale(15)}}
                            placeholder='Email'

                        />
                    </View>
                    <View className='bg-white_color text-black rounded-md' style={{marginVertical:scale(20)}}>
                        <TextInput
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            placeholderTextColor={'black'}
                            style={{color:'black', padding:scale(15)}}
                            autoCapitalize='none'
                            placeholder='Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                        <Text className='text-right text-white_color'>Forgot Password?</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: responsiveHeight(3) }}>
                        <CustomButtons disable={isLoading} isLoading={isLoading} title={'Login'} textColor={'white_color'} color={'brown_darker'} onClick={() => LoginUser()} />
                    </View>
                </View>
                <Text className="text-white_color text-xl font-bold text-center py-5">
                    Or
                </Text>
                <View className="flex-row justify-center space-x-12">
                    <GoogleSignInButton />
                    {/* <FacebookSignInButton/> */}
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="font-semibold text-white_color">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-brown_darker"> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
