import { View, Text } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const PodCastTitleLogo = () => {
  return (
    <View>
      <Text className='text-4xl text-white_color text-center font-bold mb-4' style={{marginTop:responsiveHeight(8)}}>Podcast Tonight</Text>
    </View>
  )
}

export default PodCastTitleLogo