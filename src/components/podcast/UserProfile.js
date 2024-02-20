import { Image } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useSelector } from 'react-redux'
import { defaultProfile } from '../../utils/Constants'
import { MakeCompleteUrl } from '../Helper/MakeCompleteUrl'
import { scale } from 'react-native-size-matters'

const UserProfile = () => {
    const podcastData = useSelector(state => state.userData)
    return (
        <Image source={{ uri: podcastData?.user?.avatar ? MakeCompleteUrl(podcastData?.user?.avatar) : defaultProfile }}
            style={{ height: scale(45), width: scale(45) }}
            resizeMode='cover'
            className='rounded-full'
        />
    )
}

export default UserProfile