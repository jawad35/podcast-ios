import { View, TextInput, ScrollView, SafeAreaView, Text } from 'react-native'
import React, { useState } from 'react'
import TypeCard from '../../components/podcast/TypeCard'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ShadowCardStyle } from '../../styles/showcard'
import Categories from '../../components/podcast/Categories'
import UserProfile from '../../components/podcast/UserProfile'
import { useSelector } from 'react-redux'
import PodcastRadio from '../../components/podcast/PodcastRadio'

export default function PodHome({ navigation }) {
  return (
    <SafeAreaView className='bg-black'>
      {/* top header */}
      <View>
        <View className='flex-row justify-items-center justify-center m-2 space-x-2'>
          <View className='rounded-lg flex-1 bg-white_color text-black' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
            <TextInput className='text-black' placeholderTextColor={'black'} placeholder='Search...' />
          </View>
          <View onTouchStart={() => navigation.openDrawer()} className='justify-items-center justify-center'>
            <UserProfile />
            {/* <MagnifyingGlassIcon size={'35'} color={'black'} /> */}
          </View>
        </View>
        <View className='mb-4'>
          <Categories />
        </View>
        <View>
        
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: responsiveHeight(65), marginHorizontal: 10, position:'relative' }}>
            <TypeCard title={'Podcast Radio'} image={'https://res.cloudinary.com/dqmoofr4j/image/upload/v1704196080/podcast/PODCAST_TONIGHT_radio_eina3f.jpg'} />
            <PodcastRadio/>
            <TypeCard onClick={() => navigation.navigate('SuggestionPosts')} title={'Podcast Suggestions'} image={'https://res.cloudinary.com/dqmoofr4j/image/upload/v1704196049/podcast/PODCAST_TONIGHT_suggestions_kqecif.jpg'} />
            <TypeCard onClick={() => navigation.navigate('TrendingPosts')} title={'Trendings Podcast'} image={'https://res.cloudinary.com/dqmoofr4j/image/upload/v1704196082/podcast/PODCAST_TONIGHT_trending_kdqtwp.jpg'} />
            <TypeCard onClick={() => navigation.navigate('PodCategories')} title={'Podcast Categories'} image={'https://res.cloudinary.com/dqmoofr4j/image/upload/v1704196080/podcast/PODCAST_TONIGHT_Category_myohxr.jpg'} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}