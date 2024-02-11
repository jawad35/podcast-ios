import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { ShadowCardStyle } from '../../styles/showcard';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { ApiUrl } from '../../constants/globalUrl';
import CustomButtons from '../../components/Items/CustomButtons';
import { scale } from 'react-native-size-matters';
import { SetUserData } from '../../redux/PodcastUsers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

// subscribe for more videos like this :)
export default function CodeVerification({ route }) {
    const { userData } = route?.params
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [code, setCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const VerifyCode = async () => {
        try {
            const data = {
                otp: code,
                userid: userData?.user?._id
            }
            setIsLoading(true)
            const response = await ApiUrl.post(`/api/user/verify-email`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.data.success) {
                setIsLoading(false)
                dispatch(SetUserData(response.data.user))
                await AsyncStorage.setItem('isLogged', response?.data?.user._id)
                navigation.navigate('Parent')
            } else {
                Alert.alert('Error', response.data.error);
                setIsLoading(false)

            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong!');
            console.error('Upload error:', error);
            setIsLoading(false)

        }
    };
    return (
        <ScrollView className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <View style={{ marginTop: responsiveHeight(10) }} className="flex-row justify-center">
                    <PodCastTitleLogo />
                </View>
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='py-6 text-2xl font-bold text-center text-white_color'>Verification</Text>
                    <Text className='mt-6 text-lg font-semibold text-white_color'>
                        {/* We sent you a code on that email which your provided
                        for password recovery.{'\n'}
                         */}
                        Please enter the verification code.
                    </Text>

                    <View className='mt-7 bg-white_color' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value={code}
                            onChangeText={(code) => setCode(code)}
                            placeholder='Enter Code'
                            maxLength={4}
                            keyboardType='numeric'
                            placeholderTextColor={'black'}
                            style={{ color: 'black', padding: scale(15) }}
                        />
                    </View>
                    <View style={{ marginTop: scale(10) }}>
                        <CustomButtons disable={isLoading} isLoading={isLoading} title={'Submit'} textColor={'white_color'} color={'brown_darker'} onClick={() => VerifyCode()} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
