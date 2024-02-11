import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getPodcastCategory } from '../../redux/SelectedCategorySlice'
import { useNavigation } from '@react-navigation/native';

const NicheItem = ({item, category}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();

  return (
    <View className='m-2'>
      {
      category === false  ? <Text onPress={() => {
        dispatch(getPodcastCategory(item.title.toLowerCase()))
        navigation.navigate('CategoryPodcasts', {category:item.title})
      }} className={`text-black font-medium text-base`}>{item.title}</Text> : <Text className={`text-black font-medium text-base`}>{item.title}</Text>
      }
    </View>
  )
}

export default NicheItem