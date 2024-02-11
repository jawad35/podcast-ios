import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const ButtonLoaderIndicator = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size={'large'} />
    </View>
  )
}

export default ButtonLoaderIndicator