import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ApiUrl } from '../../constants/globalUrl'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native';
import CustomButtons from '../../components/Items/CustomButtons';
import * as AnimateAble from 'react-native-animatable'

const AtStartSelectRole = ({ route }) => {
  console.log(route.params)
  const navigation = useNavigation()
  const [active, setActive] = useState(0)

  const OnSubmit = () => {
    const UserData = {
      ...route.params,
      role: active
    }
    navigation.navigate("PodCategories", UserData)
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View style={{ marginHorizontal: scale(25) }}>
        <Text className='text-white_color text-center' style={{ marginTop: scale(20), fontSize: scale(15) }}>Going to join Podcast as a?</Text>
      </View>
      <View className='flex-1 justify-center items-center' style={{ marginVertical: scale(10), marginHorizontal: scale(25) }}>
        <AnimateAble.View animation={'fadeInLeft'} className={`flex-1 justify-center  items-center w-full bg-${active === 1 ? 'brown_darker' : 'white_color'} m-3 p-3 rounded-md`}>
          <TouchableOpacity onPress={() => setActive(1)} >
            <Text style={{ fontSize: scale(40), marginVertical: scale(10) }} className={`font-bold text-${active === 1 ? 'white_color' : 'black'}`}>Podcast Listener</Text>
          </TouchableOpacity>
        </AnimateAble.View>
        <AnimateAble.View animation={'fadeInRight'} className={`flex-1 justify-center  items-center w-full bg-${active === 2 ? 'brown_darker' : 'white_color'} m-3 p-3 rounded-md`}>
          <TouchableOpacity onPress={() => setActive(2)} >
            <Text style={{ fontSize: scale(40), marginVertical: scale(10) }} className={`font-bold text-${active === 2 ? 'white_color' : 'black'}`}>Podcaster</Text>
          </TouchableOpacity>
        </AnimateAble.View>
      </View>
      <AnimateAble.View animation={'fadeInUp'} style={{ marginHorizontal: scale(25) }}>
        <CustomButtons styling={'mb-4'} onClick={() => OnSubmit()} textColor={'white_color'} color={"brown_darker"} title={"Next"} />
      </AnimateAble.View>

    </SafeAreaView>
  )
}

export default AtStartSelectRole