import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Switch } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { ApiUrl } from '../../constants/globalUrl';
import { SetUserData } from '../../redux/PodcastUsers';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const podcastData = useSelector(state => state.userData)
    const [isEnabled, setIsEnabled] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const handleUpdateUserRole = async (fileName) => {

        try {
            setIsLoading(true)
            const formData = { role: podcastData?.user?.role === '1' ? "2" : "1", userid: podcastData?.user?._id }
            const response = await ApiUrl.post(`/api/user/update-role`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                setIsLoading(false)
                setIsEnabled((previousState) => !previousState);
                dispatch(SetUserData(response?.data?.user))
            } else {
                setIsLoading(false)

                Alert.alert("Error", "Something went wrong!")
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Upload error:', error);
        }
    };
    useEffect(() => {
        setIsEnabled(podcastData?.user?.role === '1')
    }, [])
    return (
        <DrawerContentScrollView {...props}>
            {/* Your custom header */}
            <View style={{ padding: scale(16), borderBottomWidth: 1, borderBottomColor: '#ddd' }} >
                {/* <TouchableOpacity className='flex-row items-center '>
                    <Text className='text-black'>Switch to {isEnabled ? 'Podcaster' : 'Listener'}</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={'#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={handleUpdateUserRole}
                        value={isEnabled}
                        disabled={isLoading}
                    />
                </TouchableOpacity> */}
                {
                    podcastData?.user?.subscriptionData && <View>
                        <Text className='font-bold' style={{ fontSize: scale(20) }}>Subscription</Text>

                        <View className='flex-row'>
                            <Text className='bg-brown_darker px-2 py-1 rounded-md my-1 mr-1 text-white_color font-bold'>{podcastData?.user?.subscriptionData[0]?.type}</Text>
                            <Text className='bg-gray_light px-2 py-1 rounded-md my-1 text-white_color font-bold'>{podcastData?.user?.subscriptionData[0]?.type === 'Free Trail' ? "90 Days" : "30 Days"}</Text>
                        </View>
                        <View className=''>
                            {/* <Text className='text-brown_darker'>Your Free Plan Ended</Text> */}
                            <Text onPress={() => navigation.navigate('StripeProducts')} className='bg-gray_light px-2 py-2 rounded-md my-1 text-white_color font-bold text-center'>Upgrade Your Plan</Text>
                        </View>
                    </View>
                }

            </View>
            {/* Drawer items */}
            <DrawerItemList {...props} />
            {/* Your custom footer */}
            {/* <TouchableOpacity
        style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#ddd' }}
      >
        <Text style={{ fontSize: 18, color: 'blue' }}>Custom Drawer Footer</Text>
      </TouchableOpacity> */}
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
