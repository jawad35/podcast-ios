import { View, Text, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { ShadowCardStyle } from '../../styles/showcard';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import CustomButtons from '../../components/Items/CustomButtons';
import { ApiUrl } from '../../constants/globalUrl';
import { scale } from 'react-native-size-matters';

// subscribe for more videos like this :)
export default function ChangePassword({ route }) {
    const { userid } = route?.params
    const navigation = useNavigation();
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleChangePassword = async () => {
        try {
            setIsLoading(true)
            const data = {
                password: password,
                userid: userid
            }
            const response = await ApiUrl.post(`/api/user/reset-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                setIsLoading(false)
                Alert.alert('Verified', response.data.message);
                navigation.navigate('Login')
            } else {
                setIsLoading(false)
                Alert.alert('Error', response.data.error);
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            Alert.alert('Error', 'Something went wrong!');
        }
    };
    return (
        <ScrollView className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <PodCastTitleLogo />
            </SafeAreaView>
            <View className="flex-1"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
            >
                <View className="form m-6">
                    <Text className='py-6 text-2xl font-bold text-center text-white_color'>Reset Password</Text>
                    <Text className='mt-6 text-md text-white_color'>
                        Create your new password.
                    </Text>
                    <View className='mt-7 bg-white_color' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput
                            value={password}
                            secureTextEntry
                            onChangeText={(text) => setPassword(text)}
                            placeholder='Password'
                            placeholderTextColor={'black'}
                            style={{color:'black', paddingHorizontal:scale(15)}}
                        />
                    </View>
                    <View style={{ marginTop: responsiveHeight(5) }}>
                        <CustomButtons isLoading={isLoading} textColor={'white_color'} color={'brown_darker'} title={"Change Password"} onClick={handleChangePassword} />
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}
