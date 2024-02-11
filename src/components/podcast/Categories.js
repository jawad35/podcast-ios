import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import NicheItem from '../../components/podcast/nicheItem'
import nicheItems from '../../data/nicheItems'
const Categories = ({ navigation }) => {
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
            <View className='px-3'>
           <FlatList
                data={niche}
                horizontal={true}
                renderItem={({ item, index }) => {
                    return <TouchableOpacity
                        key={index}
                        className={`m-2 rounded-lg bg-white_color drop-shadow-lg text-black`}
                        // style={{ backgroundColor: item.value == true ? 'red' : 'blue', margin:6, borderRadius:10 }}
                        onPress={() => {
                            onSelect(index)
                        }}
                    >
                        <NicheItem category={false} item={item} />
                    </TouchableOpacity>
                }

                }
            />
           </View>
        </SafeAreaView>
    )
}




export default Categories