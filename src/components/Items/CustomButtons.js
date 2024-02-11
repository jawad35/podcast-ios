import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import customButtonsStyles from '../../styles/customButtonsStyle'
import { scale } from 'react-native-size-matters'

const CustomButtons = ({ title, onClick, color, textColor, disable, isLoading, styling }) => {
    return (
        <View style={customButtonsStyles.buttonWrapper} className={`bg-${color ? color : 'white_color'} ${styling}`}>
            <TouchableOpacity
                disabled={disable}
                className={`bg-brown_darker rounded-md w-full h-full flex justify-center items-center`}
                onPress={onClick}
            >
                <Text  className={`text-center font-semibold text-${textColor}`}>
                    {
                        isLoading ? <ActivityIndicator color={'white'} size={'small'} /> : title
                    }
                </Text>
            </TouchableOpacity>
        </View>

    )
}

export default CustomButtons