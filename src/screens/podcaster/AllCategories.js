import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Button, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NicheItem from '../../components/podcast/nicheItem'
import nicheItems from '../../data/nicheItems'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { scale, verticalScale } from 'react-native-size-matters'
import CustomButtons from '../../components/Items/CustomButtons'
import { PodCategoriesStyles } from '../../styles/podCategoriesStyle'
import { LoginController } from '../../components/Controllers/LoginController'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { ApiUrl } from '../../constants/globalUrl'
import { getPodcastCategory } from '../../redux/SelectedCategorySlice'
const PodCategories = ({ route }) => {
    const { userData, password, isLogin } = route?.params
    console.log(route.params)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [niche, setNiche] = useState(nicheItems)
    const [IsDisable, setIsDisable] = useState(true)

    const onSelect = (index) => {
        setNiche((prevNiche) => {
            return prevNiche.map((item, i) => {
                return i === index ? { ...item, value: !item.value } : item
            }
            )
        }
        );
        // console.log(count)

    }
    // console.log(selectCatgories)
    const AddCategories = async () => {
        const trueValues = niche.filter(item => item.value === true);
        const titlesWithTrueValue = trueValues.map(item => item.title)
        try {
            const postData = {
                categories: titlesWithTrueValue,
                id: userData?.user?._id
            }
            const response = await ApiUrl.post(`/api/user/add-categories`, postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                // setIsFollow(false)
                // setFollowers(response.data.followers)
                // setFollowing(response.data.following)
                // setRefresh('2')
                LoginController(userData?.user?.email, password, navigation, false, dispatch)
                console.log(response.data)
            }
        } catch (error) {
            // Alert.alert("Error", error)
            console.log(error)
        }
        console.log(titlesWithTrueValue)
    }
    useEffect(() => {
        const countOfTrueValues = niche.filter(item => item.value === true).length;
        if (countOfTrueValues > 3 || countOfTrueValues === 0) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [niche])

    return (
        <SafeAreaView className='bg-black flex-1'>
            <ScrollView className='px-4' >
                <Text className={`font-bold text-white_color text-center`} style={{ fontSize: scale(20), marginVertical: scale(20) }}>Categories</Text>
                <Text className={` text-white_color text-center`} style={{ marginVertical: scale(20) }}>Select up to three categories from the list</Text>
                <View style={[PodCategoriesStyles.container, { marginBottom: isLogin && scale(80) }]}>
                    {
                        niche.map((item, index) => {
                            {
                                return <TouchableOpacity
                                    key={index}
                                    className={`bg-white_color m-2 rounded-lg drop-shadow-lg`}
                                    style={[PodCategoriesStyles.box, { backgroundColor: item.value == true ? 'red' : 'white', margin: 6, borderRadius: 10 }]}
                                    onPress={() => {
                                        if (isLogin) {
                                            dispatch(getPodcastCategory(item?.title?.toLowerCase()))
                                            navigation.navigate('CategoryPodcasts')
                                        } else {
                                            onSelect(index)
                                        }
                                    }}
                                >
                                    <Text className={`text-black font-medium text-base`}>{item?.title}</Text>
                                </TouchableOpacity>
                            }
                        })
                    }
                </View>
                {
                    !isLogin && <View style={{ marginVertical: scale(40) }}>
                        <CustomButtons disable={IsDisable} onClick={AddCategories} color={'brown_darker'} textColor={'white_color'} title={'Done!'} />
                    </View>
                }
            </ScrollView>

        </SafeAreaView>
    )
}




export default PodCategories