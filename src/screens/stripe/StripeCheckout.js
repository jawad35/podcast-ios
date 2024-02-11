import { View, Text, SafeAreaView, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
// import { CardField, confirmPayment, createToken } from '@stripe/stripe-react-native'
import StripeButton from '../../components/Items/StripeButton'
import creatPaymentIntent from '../../components/Controllers/CreatePaymentIntent'
import { ApiUrl } from '../../constants/globalUrl'
import { scale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GetPackageName } from '../../components/Helper/GetPackageName'
import { SetUserData } from '../../redux/PodcastUsers'

const StripeCheckout = ({route}) => {
    const [cardInfo, setCardInfo] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const podcastData = useSelector(state => state.userData)
    const navigation = useNavigation();
    const fetchCardDetail = (cardDetail) => {
        if (cardDetail.complete) {
            setCardInfo(cardDetail)
        } else {
            setCardInfo(null)
        }
    }

    const onDone = async () => {
        // if (!!cardInfo) {
        //     try {
        //         const resToken = await createToken({ ...cardInfo, type:'Card'})
        //         console.log(resToken, 'hello')
        //     } catch (error) {
        //         console.log('error', error)
        //     }
        // }
        let apiData = {
            amount: route.params.price * 100,
            name:podcastData?.user?.fullname,
            email:podcastData?.user?.email
        }
        try {
            setLoading(true)
            const response = await ApiUrl.post(`/api/subs/payment-sheet`, apiData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // if (response?.data?.paymentIntent) {
            //     const confirmPaymentIntent = await confirmPayment(response?.data?.paymentIntent, { paymentMethodType: 'Card' })
            //     if(confirmPaymentIntent?.paymentIntent?.status === 'Succeeded') {
            //         const subscriptionData = {
            //             type:GetPackageName(route.params.price * 100),
            //             userid:podcastData?.user?._id,
            //             email:podcastData?.user?.email
            //         }
            //         const response = await ApiUrl.post(`/api/user/update-subscription`, subscriptionData, {
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             }
            //         });
            //         if(response.data.success) {
            //             dispatch(SetUserData(response?.data?.user))
            //             Alert.alert("Payment","Payment Done succesfully")
            //             setLoading(false)
            //             navigation.navigate('Parent')
            //         } else {
            //             setLoading(false)
            //             Alert.alert("Error","Something went wrong!")
            //         }
            //     }
            // }
        } catch (error) {
            setLoading(false)
            console.log("Error rasied during payment intent", error)
        }
    }

    return (
        <View className='flex-1'>
            <SafeAreaView className='flex-1 bg-black justify-center' style={{ padding: scale(20) }}>
                <View className='flex items-center'>
                    <Image source={{ uri: 'https://res.cloudinary.com/dqmoofr4j/image/upload/v1705575882/podcast/main_logo_podcast_ijvnjv.jpg' }}
                        style={{ height: scale(120), width: scale(120) }}
                        resizeMode='cover'
                        className='rounded-full'
                    />
                </View>
                <View className='mt-7 bg-text_gray text-white_color rounded-md'>
                    <TextInput
                        autoCapitalize='none'
                        placeholder=''
                        placeholderTextColor={'black'}
                        readOnly
                        value={podcastData?.user?.email}
                        style={{ color: 'black', paddingHorizontal: scale(15) }}
                    />
                </View>
                <View className='mt-7 bg-text_gray text-white_color rounded-md'>
                    <TextInput
                        autoCapitalize='none'
                        placeholder=''
                        placeholderTextColor={'black'}
                        readOnly
                        value={podcastData?.user?.fullname}
                        style={{ color: 'black', paddingHorizontal: scale(15) }}
                    />
                </View>
                {/* <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}

                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30
                    }}
                    onCardChange={(cardDetails) => {
                        fetchCardDetail(cardDetails)
                    }}

                    onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                    }}

                /> */}

                <StripeButton onPress={onDone} isLoading={isLoading} disabled={!cardInfo} />
            </SafeAreaView>

        </View>
    )
}

export default StripeCheckout