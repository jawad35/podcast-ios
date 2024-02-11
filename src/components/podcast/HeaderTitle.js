import { View, Text } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const HeaderTitle = ({ title, icon }) => {
  const navigation = useNavigation()
  return (
    <View className='bg-white_color flex-row items-center relative'>
      <Text className='ml-2 p-2 absolute z-10' onPress={() => navigation.goBack()}>
        {
          icon && <ArrowLeftIcon color={'black'} />
        }
      </Text>
      <Text className='flex-1 text-xl text-center m-2 text-black font-semibold'>{title}</Text>
    </View>
  )
}

export default HeaderTitle