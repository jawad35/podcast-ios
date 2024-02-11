import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
// import trendingPodcasts from '../../data/podcastersimages'
import { responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { ShadowCardStyle } from '../../styles/showcard'
import VideoPlayer from 'react-native-video';
import CustomButtons from '../../components/Items/CustomButtons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function PodPosts() {
  const navigation = useNavigation()
  const podcastData = useSelector(state => state.userData)
  const [podcast, setPodcast] = useState([])
  console.log(podcastData.user.podcast, 'haan wai')
  const trendingPodcasts = [
    'https://img.freepik.com/free-vector/gradient-podcast-cover-template_23-2149449551.jpg',
    'https://www.searchenginejournal.com/wp-content/uploads/2020/02/7-tips-to-make-a-successful-podcast-5e3d9fa1ad735.png',
    'https://img.freepik.com/vector-gratis/plantilla-plana-portada-podcast-dibujada-mano_23-2149429806.jpg?w=2000',
    'https://img.freepik.com/vetores-gratis/capa-de-podcast-plana-desenhada-a-mao-de-musica_23-2149444190.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1696636800&semt=ais',
    'https://assets-global.website-files.com/5fac161927bf86485ba43fd0/6470607db5ddc9c102ef4a14_How-to-Start-a-Podcast-(1).jpeg'
  ]

  return (
    <SafeAreaView className='bg-black'>
      <HeaderTitle icon={true} title={'Your Podcast'} />
      <View className='p-2'>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(20) }}>
          <Text className='font-bold text-2xl my-2 text-white_color text-center'>Comedy</Text>
          <Image source={{ uri: trendingPodcasts[0] }}
            style={{ height: responsiveHeight(30), width: '100%' }}
            resizeMode='cover'
            className='rounded-lg my-2'
          />
          <View style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
            <Text className='text-lg px-2 py-4 text-white_color'>
              Podcasts have become a popular and effective medium for engagingly delivering information, offering listeners the chance to learn about any subject at their own convenience.
            </Text>
          </View>
          <CustomButtons title={"All Videos"} onClick={() => navigation.navigate("YourVideos")}/>
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}