import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PodCastTitleLogo from '../../components/podcast/PodCastTitleLogo';
import { ShadowCardStyle } from '../../styles/showcard';
import CustomButtons from '../../components/Items/CustomButtons';
import { launchImageLibrary } from 'react-native-image-picker';
import uuidv4 from 'react-native-uuid';
import { ApiUrl } from '../../constants/globalUrl';
import { SignUpController } from '../../components/Controllers/SignUpController';
import GoogleSignInButton from '../../components/socialLoginButtons/GoogleSignInButton';
import { scale } from 'react-native-size-matters';
import SelectDropdown from 'react-native-select-dropdown'
import userroles from '../../data/userroles';
import PodcastRadio from '../../components/podcast/PodcastRadio';
import OverlayLoading from '../../components/Items/OverlayLoading';
import { useSelector } from 'react-redux';
import { UserFormValidation } from '../../components/Helper/FormValidation';
import { IsUserExistController } from '../../components/Controllers/IsUserExistController';

// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
    const podcastData = useSelector(state => state.userData)
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [role, setRole] = useState(null)
    const [profileImage, setProfileImage] = useState('')
    const [imageLocalPath, setImageLocalPath] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // const windowHeight = Dimensions.get('window').height;
    const SignUpUser = async () => {
        const areValidInputs = UserFormValidation(fullname?.replace(/\s/g, ''), email?.replace(/\s/g, ''), password?.replace(/\s/g, ''))
        const isUserExist = await IsUserExistController(email, setIsLoading)
        console.log(isUserExist)
        if (isUserExist) {
            return Alert.alert("Exist", 'This email user already exist!')
        } else {
            if (areValidInputs) {
                const UserData = {
                    fullname, email, password, isSocailLogin:false
                }
                setIsLoading(false)
                navigation.navigate('AtStartSelectRole', UserData)
            }
        }
        // SignUpController(fullname, email, password, role, null, navigation, false, setIsLoading)

    }
    // const openProfilePicker = () => {
    //     launchImageLibrary({}, (response) => {
    //         if (!response.didCancel) {
    //             setProfileImage(response.assets[0])
    //             setImageLocalPath(response.assets[0].uri)
    //         }
    //     });
    // };
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(6) }} className="flex-1 bg-black">
            <SafeAreaView className="flex">
                <PodCastTitleLogo />
            </SafeAreaView>
            {
                podcastData?.isoverlay && <OverlayLoading />
            }
            <View className="form m-6">
                <Text className='text-xl text-white_color font-bold'>
                    Create your Account
                </Text>

                <View className='mt-7 bg-white_color rounded-md'>
                    <TextInput
                        value={fullname}
                        onChangeText={(fullname) => setFullname(fullname)}
                        autoCapitalize='none'
                        placeholder='Fullname'
                        placeholderTextColor={'black'}
                        style={{ color: 'black', padding: scale(15) }}
                    />
                </View>

                <View className='bg-white_color rounded-md' style={{ marginVertical: scale(20) }}>
                    <TextInput
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize='none'
                        placeholder='Email'
                        placeholderTextColor={'black'}
                        style={{ color: 'black', padding: scale(15) }}
                    />
                </View>
                <View className='bg-white_color rounded-md'>
                    <TextInput
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize='none'
                        placeholder='Password'
                        secureTextEntry={true}
                        placeholderTextColor={'black'}
                        style={{ color: 'black', padding: scale(15) }}
                    />
                </View>
                {/* <View className='flex flex-row justify-around' style={{ marginTop: scale(20) }}>
                    <SelectDropdown
                        defaultButtonText='Select Role'
                        buttonStyle={{
                            backgroundColor: '#ffffff',
                            borderRadius: 8,
                            borderColor: '#ccc',
                            width: '100%',
                            height: scale(45)
                        }}
                        dropdownStyle={{ borderRadius: 8 }}
                        data={userroles.map(item => item.title)}
                        onSelect={(selectedItem, index) => {
                            setRole(index+1)

                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                </View> */}
                {/* <View className='flex-1 justify-center items-center'>
                    {imageLocalPath && <Image className='rounded-lg' source={{ uri: imageLocalPath }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} />}
                    <CustomButtons title={'Profile Image'} color={'white_color'} onClick={() => openProfilePicker()} />
                </View> */}
                <View className={`mt-8`}>
                    <CustomButtons disable={isLoading} isLoading={isLoading} title={'Sign Up'} textColor={'white_color'} color={'brown_darker'} onClick={() => SignUpUser()} />
                </View>
            </View>
            <Text className="text-white_color text-xl font-bold text-center py-5">
                Or
            </Text>
            <View className="flex-row justify-center space-x-12">
                <GoogleSignInButton />
                
            </View>
            <View className="flex-row justify-center mt-7">
                <Text className="font-semibold text-white_color">Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text className="font-semibold text-brown_darker"> Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}