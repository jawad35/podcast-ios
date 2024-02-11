import React, { useRef, useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';
import { ArrowLeftIcon, FilmIcon, IdentificationIcon, UserCircleIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { MakeCompleteUrl } from '../Helper/MakeCompleteUrl';
import { scale } from 'react-native-size-matters';

const SingleReel = ({ item, index, currentIndex, setCurrentIndex, icon }) => {
    console.log(item.video)
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const videoRef = useRef(null);
    const navigation = useNavigation()

    const handlePause = () => {
        console.log(videoRef.current)

        if (videoRef.current) {
            videoRef.current._onSeek(0);
            videoRef.current._onPlaybackResume();
        }
    };
    const onBuffer = buffer => {
        console.log('buffring', buffer);
    };
    const onError = error => {
        console.log('error', error);
    };
    return (
        <View
            style={{
                width: windowWidth,
                height: windowHeight,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <ActivityIndicator color={'white'} size={'large'} />
            <TouchableOpacity
                // onPress={() => handlePause()}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}>
                <Video
                    ref={videoRef}
                    onBuffer={onBuffer}
                    onError={onError}
                    repeat={true}
                    resizeMode="cover"
                    //   paused={true}
                    // controls={true}
                    paused={currentIndex == index ? false : true}
                    source={{ uri: MakeCompleteUrl(item?.video) }}
                    // muted={mute}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }}
                />
                <TouchableOpacity
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        position: 'absolute',
                        top: 0,

                    }}
                    onPress={() => {
                        if (currentIndex === -1) {
                            setCurrentIndex(index)
                        } else {
                            setCurrentIndex(-1)
                        }
                    }}
                >
                    {
                        icon ? <IdentificationIcon onPress={() => navigation.navigate("Profile", { userid: item?.userid })} size={45} style={{ color: '#ccc', bottom: scale(110), position: 'absolute', right: scale(25) }} /> :
                            <ArrowLeftIcon onPress={() => navigation.goBack()} size={35} style={{ color: '#F40000', position: 'absolute', left: scale(25), top: scale(15) }} />
                    }
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

export default SingleReel;