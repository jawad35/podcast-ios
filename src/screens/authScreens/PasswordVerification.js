import { View, Text, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { ShadowCardStyle } from '../../styles/showcard';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { scale } from 'react-native-size-matters';
import CustomButtons from '../../components/Items/CustomButtons';

// subscribe for more videos like this :)
export default function PasswordVerification({ route }) {
    const { otp, id } = route.params
    const navigation = useNavigation();
    const [code, setCode] = useState('')

    const VerifyCode = async () => {
        if (code === otp) {
            navigation.navigate('ChangePassword', { userid: id })

        } else {
            Alert.alert("Error", "Please Enter a valid code")
        }
    };
    return (
        <ScrollView className="flex-1 bg-black">
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
                    <Text className='mt-6 text-lg font-semibold text-white_color'>
                        Please enter the verification code.
                    </Text>
                    <View className='mt-7 bg-white_color rounded-md'>
                        <TextInput
                            value={code}
                            onChangeText={(code) => setCode(code)}
                            placeholder='Enter Code'
                            placeholderTextColor={'black'}
                            maxLength={4}
                            keyboardType='numeric'
                            style={{color:'black', paddingHorizontal:scale(15)}}
                        />
                    </View>
                    <View style={{ marginTop: scale(20) }}>
                        <CustomButtons  title={'Submit'} textColor={'white_color'} color={'brown_darker'} onClick={() => VerifyCode()} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
