import { View, Text, Button, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { ApiUrl, ServerUrl } from '../../constants/globalUrl'
import { CapitalizeString } from '../../components/Helper/CapitalizeString'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { defaultProfile } from '../../utils/Constants'
import { MakeCompleteUrl } from '../../components/Helper/MakeCompleteUrl'

export default function TrendingPosts() {
  const [TrendingPodcasts, setTrendingPodcast] = useState([])
  const podcastData = useSelector(state => state.userData)

  const navigation = useNavigation()
  
  const GetTrendingPodcast = async () => {
    const response = await ApiUrl.get(`/api/user/trendings`);
    if (response.data.success) {
      setTrendingPodcast(response.data.trendings)
    }
  }
  useEffect(() => {
    GetTrendingPodcast()
  }, [podcastData])
  return (
    <SafeAreaView className='bg-black flex-1'>
      <HeaderTitle title={'Podcast Trendings'} />
      {
        TrendingPodcasts.length !== 0 ?  <View className='p-2'>
        <ScrollView  contentContainerStyle={{ flexGrow: 1, paddingBottom: scale(180) }}>
          {
            TrendingPodcasts?.map((item, index) => {
              return <TouchableOpacity key={index} onPress={() => navigation.navigate("Profile", { userid: item?._id })} className='relative'>
                <Text className='absolute z-10 bg-white_color text-black' style={{ margin: scale(10), paddingHorizontal: scale(10), paddingVertical: scale(5), borderRadius: scale(6), bottom: scale(10) }}>
                  {
                    item?.fullname?.length > 20 ? CapitalizeString(item.fullname).substring(0, 20) + '...' : CapitalizeString(item.fullname)
                  }
                </Text>
                <Image key={index} source={{ uri: item.avatar ? MakeCompleteUrl(item.avatar) : defaultProfile }}
                  style={{ height: scale(250), width: '100%' }}
                  resizeMode='cover'
                  className='rounded-lg my-2'
                />
              </TouchableOpacity>
            })
          }

        </ScrollView>
      </View> :  <View className='flex-1 justify-center items-center'>
      <Text className='text-white_color'>No Podcast</Text>
      </View>
      }

    </SafeAreaView>
  )
}