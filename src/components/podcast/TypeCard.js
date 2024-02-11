import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'
const TypeCard = ({ title, image, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Text className='font-bold text-white_color' style={{ fontSize: scale(25), paddingVertical: scale(10) }}>
        {title}
      </Text>
      <View className='flex justify-center items-center'>
        <Image source={{ uri: image }}
          style={{ height: scale(350), width: '100%' }}
          resizeMode='cover'
          className='rounded-lg mb-9'
        />
      </View>
    </TouchableOpacity>
  )
}

export default TypeCard