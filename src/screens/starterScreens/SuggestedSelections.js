import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import NicheItem from '../../components/podcast/nicheItem'
import nicheItems from '../../data/nicheItems'
const SuggestedSelections = ({ navigation }) => {
    const [niche, setNiche] = useState(nicheItems)
    const onSelect = (index) => {
        setNiche((prevNiche) =>
        prevNiche.map((item, i) =>
          i === index ? { ...item, value: !item.value } : item
        )
      );
    }
    return (
        <SafeAreaView className='bg-black'>
            <View className='h-full px-4'>
                <Text className={`py-8 text-xl text-white_color`}>Please choose niches between 1-3 for better exprience</Text>
           <View>
           <FlatList
                data={niche}
                numColumns={3}
                renderItem={({ item, index }) => {
                    return <TouchableOpacity
                        key={index}
                        className={`${item.value == false ? 'bg-white_color':'bg-brown_darker'}  m-2 rounded-lg drop-shadow-lg`}
                        // style={{ backgroundColor: item.value == true ? 'red' : 'blue', margin:6, borderRadius:10 }}
                        onPress={() => {
                            onSelect(index)
                        }}
                    >
                        <NicheItem category={true} item={item} />
                    </TouchableOpacity>
                }

                }
            />
           </View>
            
            <View className='absolute bottom-0 w-full p-8'>
                <TouchableOpacity className='rounded-xl bg-brown_darker'
                onPress={() => navigation.navigate('Parent')}
                >
                <Text className='font-bold text-center text-white_color text-xl p-3'>
                    Finish
                </Text>
                </TouchableOpacity>
            </View>
            </View>
            
        </SafeAreaView>
    )
}




export default SuggestedSelections