import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { ShadowCardStyle } from '../../styles/showcard';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { ApiUrl } from '../../constants/globalUrl';
import CustomButtons from '../../components/Items/CustomButtons';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../../components/podcast/HeaderTitle';
import GenerateOTP from '../../components/Helper/GenerateOTP';
import { scale } from 'react-native-size-matters';

// subscribe for more videos like this :)
export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false)

    const handleEmailVerification = async () => {
        const OTP = GenerateOTP()
        try {
            setIsLoading(true)
            const data = { email: email, otp: OTP }
            const response = await ApiUrl.post(`/api/user/forget-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.data.success) {
                setIsLoading(false)
                Alert.alert('Error', response.data.error);
            }
            if (response.data.success) {
                setIsLoading(false)
                navigation.navigate('PasswordVerifcationCode', { otp: OTP, id: response.data.id })
                Alert.alert('Reset Password', response.data.message);
            }
        } catch (error) {
            setIsLoading(false)
            Alert.alert('Error', 'Something went wrong!');
        }
    };

    // const navigation = useNavigation();
    return (
        <ScrollView className="flex-1 bg-black">
            <HeaderTitle icon={true} title={"Email Verification"} />
            <SafeAreaView className="flex">
                <View className="flex-row justify-center">
                    <PodCastTitleLogo />
                </View>
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='py-6 text-2xl font-bold text-center text-white_color'>Verification</Text>
                    <Text className='mt-6 text-md text-white_color'>
                        Don't worry.{'\n'}
                        Enter your email and we will send you a verification
                        code to reset your password
                    </Text>
                    <View className='mt-7 bg-white_color rounded-md'>
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{color:'black', paddingHorizontal:scale(15)}}
                            placeholder='Enter Email'
                            placeholderTextColor={'black'}

                        />
                    </View>
                    <View style={{ marginTop: responsiveHeight(3) }}>
                        <CustomButtons isLoading={isLoading} title={'Send'} textColor={'white_color'} color={'brown_darker'} onClick={() => handleEmailVerification()} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
