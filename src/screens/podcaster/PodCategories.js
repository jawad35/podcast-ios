import { View, Text,  TouchableOpacity, SafeAreaView, Button, StyleSheet, ScrollView, Alert } from 'react-native'
import React, {  useState } from 'react'
import nicheItems from '../../data/nicheItems'
import { scale } from 'react-native-size-matters'
import CustomButtons from '../../components/Items/CustomButtons'
import { PodCategoriesStyles } from '../../styles/podCategoriesStyle'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getPodcastCategory } from '../../redux/SelectedCategorySlice'
import * as AnimateAble from 'react-native-animatable'

const PodCategories = ({ route }) => {
    const { role } = route?.params
    const podcastData = useSelector(state => state.userData)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [niche, setNiche] = useState(nicheItems)
    const onSelect = (index) => {
        setNiche((prevNiche) => {
            return prevNiche.map((item, i) => {
                return i === index ? { ...item, value: !item.value } : item
            }
            )
        }
        );
    }

    const CreatUser = async () => {
        const countOfTrueValues = niche.filter(item => item.value === true).length;
        if (role === 2) {
            if (countOfTrueValues > 5 || countOfTrueValues === 0) {
                return Alert.alert("Categories", "Categories should be between 1-5")
            }
        } else {
            if (countOfTrueValues > 3 || countOfTrueValues === 0) {
                return Alert.alert("Categories", "Categories should be between 1-3")
            }
        }
       
        const trueValues = niche.filter(item => item.value === true);
        const titlesWithTrueValue = trueValues.map(item => item.title)
        const UserData = {
            ...route.params,
            categories:titlesWithTrueValue
        }
        navigation.navigate('StartTrial', UserData)
    }
    return (
        <SafeAreaView className='bg-black flex-1'>
            <ScrollView className='px-4' >
                <Text className={`font-bold text-white_color text-center`} style={{ fontSize: scale(20), marginVertical: scale(20) }}>Categories</Text>
                {
                    !podcastData?.user?.email && <Text className={` text-white_color text-center`} style={{ marginVertical: scale(20) }}>Select up to three categories from the list</Text>
                }
                <View style={[PodCategoriesStyles.container, { marginBottom: podcastData?.user?.email && scale(80) }]}>
                    {
                        niche.map((item, index) => {
                            {
                                return <TouchableOpacity
                                    key={index}
                                    className={`bg-white_color m-2 rounded-lg drop-shadow-lg`}
                                    style={[PodCategoriesStyles.box, { backgroundColor: item.value == true ? 'red' : 'white', margin: 6, borderRadius: 10 }]}
                                    onPress={() => {
                                        if (podcastData?.user?.email) {
                                            dispatch(getPodcastCategory(item?.title?.toLowerCase()))
                                            navigation.navigate('CategoryPodcasts', {category: item?.title})
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
                    !podcastData?.user?.email && <View style={{ marginVertical: scale(40) }}>
                        <CustomButtons onClick={CreatUser} color={'red_darker'} textColor={'white_color'} title={'Done!'} />
                    </View>
                }
            </ScrollView>

        </SafeAreaView>
    )
}




export default PodCategories