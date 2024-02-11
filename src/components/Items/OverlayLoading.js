import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const OverlayLoading = () => {
  return (
    <View className='bg-black opacity-80 absolute w-full h-full z-10 flex-1 justify-center items-center'>
        <ActivityIndicator size={40} color={'white'} />
  </View>
  )
}

export default OverlayLoading