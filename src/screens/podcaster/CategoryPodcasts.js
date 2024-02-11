import { View, Text, TextInput, SafeAreaView, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { ShadowCardStyle } from '../../styles/showcard'
import Categories from '../../components/podcast/Categories'
import { DummyPodcast } from '../../data/dummypodcasts'
import { useSelector } from 'react-redux'
import UserProfile from '../../components/podcast/UserProfile'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { scale } from 'react-native-size-matters'
import { ApiUrl } from '../../constants/globalUrl'
import TypeCard from '../../components/podcast/TypeCard'
export default function CategoryPodcasts({ navigation, route }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scatgegory = useSelector(state => state.category)
    useEffect(() => {
        const filterPodcastsByCategory = (podcasts, category) => {
            return podcasts.filter(podcast => podcast.catgegory.includes(category));
        };
        const filteredPodcasts = filterPodcastsByCategory(DummyPodcast, scatgegory.category);
        //   console.log(filteredPodcasts);
        setData(filteredPodcasts);
        // setFilteredData(filteredPodcasts);
    }, [scatgegory.category]);


    const handleSearch = (text) => {
        // Update the search query and filter the data
        setSearchQuery(text);
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const GetCategoryPodcast = async () => {
        setIsLoading(true)
        const response = await ApiUrl.post(`/api/user/get-podcast-category`, { category: route?.params?.category }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.data.success) {
            setIsLoading(false)
            setFilteredData(response.data?.podcasts)
        }
        setIsLoading(false)

    }
    useEffect(() => {
        GetCategoryPodcast()
    }, [route.params?.category])
    return (
        <SafeAreaView className=' bg-black flex-1'>
            {/* top header */}
            <View>
                <View className='flex-row justify-items-center justify-center m-2 space-x-2'>
                    <View className='rounded-lg flex-1 bg-white_color text-black' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
                        <TextInput className='text-black' placeholderTextColor={'black'} placeholder='Search...' />
                    </View>
                    <View onTouchStart={() => navigation.openDrawer()} className='justify-items-center justify-center'>
                        <UserProfile />
                    </View>
                </View>
                <View className='mb-4'>
                    <Categories />
                </View>
                <View>
                    {
                        isLoading ?
                        <View className='flex justify-center items-center'>
                        <Text className='text-white_color mt-14' >
                            <ActivityIndicator size={"large"} color={'white'} />
                        </Text>
                    </View> : <ScrollView style={{ marginBottom: scale(300) }}>
                                {
                                    filteredData?.length !== 0 ? <View>
                                        {
                                            filteredData?.map((item, index) => <Image key={index} source={{ uri: item?.podcast?.image }}
                                                style={{ height: scale(300), width: '100%' }}
                                                resizeMode='cover'
                                                className='rounded-lg mb-9'
                                            />)
                                        }
                                    </View> : <View className='flex justify-center items-center'>
                                        <Text className='text-white_color mt-14' >No data found</Text>
                                    </View>
                                }
                            </ScrollView>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}