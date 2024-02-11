import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../constants/globalUrl'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native';
import { GetPackageName } from '../../components/Helper/GetPackageName';

const StripeProducts = () => {
  const navigation = useNavigation()
  const prices = [
    {
      id:'1',
      name:"Basic",
      Price:19
    },
    {
      id:'2',
      name:"Top10",
      Price:59
    },
    {
      id:'3',
      name:"Pro",
      Price:99
    }
  ]
 
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View>
        <Text className='text-lg text-white_color text-center' style={{ marginTop: scale(20) }}>Tariff Plans</Text>
      </View>
      <View className='flex-1 justify-center items-center' style={{ marginHorizontal: scale(25), marginVertical: scale(10) }}>
        {prices.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate("PackageDetails", { item })} className='flex-1 items-center w-full bg-white_color m-3 p-3 rounded-md' key={item.id}>
            {
              item.Price === 59 && <Text style={{ fontSize: scale(10) }} className='text-start bg-red_darker px-1 absolute left-1 top-1 rounded-sm text-white_color'>Recommended</Text>
            }
            <Text className='font-bold text-text_gray'>{item.name}</Text>
            <Text style={{ fontSize: scale(40), marginVertical: scale(10) }} className='font-bold text-text_gray'>${item.Price}.00</Text>
            <Text className='text-text_gray'>Per Month</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
      </View>
    </SafeAreaView>
  )
}

export default StripeProducts