import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import React, { useEffect, useRef, useState } from 'react';
import CustomShadow from '../../components/Items/CustomShadow';
import CustomButtons from '../../components/Items/CustomButtons';
import HeaderTitle from '../../components/podcast/HeaderTitle';
import nicheItems from '../../data/nicheItems';
import { launchImageLibrary } from 'react-native-image-picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import Video from 'react-native-video';

import { ApiUrl, ServerUrl } from '../../constants/globalUrl';
import uuidv4 from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { SetUserData } from '../../redux/PodcastUsers';
import { scale } from 'react-native-size-matters';
const UpdatePodCast = () => {
    const podcastData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const [userid, setUserId] = useState('')
    const [videos, setVideos] = useState([])
    const [videoArry, setVideoArray] = useState([])
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [imageLocalPath, setImageLocalPath] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [isLoadingDes, setIsLoadingDes] = useState(false)
    const [isLoadingCat, setIsLoadingCat] = useState(false)



    useEffect(() => {
        setVideoArray(podcastData?.user?.podcast?.videos)
        setImageLocalPath(`${podcastData?.user?.podcast?.image}`)
        setDescription(podcastData?.user?.podcast?.description)
        setCategory(podcastData?.user?.podcast?.category)
        setUserId(podcastData?.user?._id)
    }, [])
    const openVideoPicker = () => {
        const options = {
            mediaType: 'video',
            quality: 1,
        };
        launchImageLibrary(options, (response) => {

            if (!response.didCancel) {
                setVideos(prevDataList => [...prevDataList, response.assets[0]])
            }
        });
    };
    const openImagePicker = () => {
        // const options = {
        //   title: 'Select Images',
        //   mediaType: 'photo',
        //   storageOptions: {
        //     skipBackup: true,
        //     path: 'images',
        //   },
        // };
        launchImageLibrary({}, (response) => {
            if (!response.didCancel) {
                setImage(response.assets[0])
                setImageLocalPath(response.assets[0].uri)
            }
        });
    };
    const handleUpdateVideos = async () => {
        if (videos.length === 0) {
            return Alert.alert("Error", "Please choose at least one video to update")
        }
        try {
            setIsLoading(true)
            const formData = new FormData();
            videos.forEach((video) => {
                formData.append('videos[]', {
                    uri: video.uri,
                    type: video.type,
                    name: video.fileName,
                });
            });
            const randomId = uuidv4.v4()
            formData.append('userid', userid)
            const response = await ApiUrl.post(`/api/user/upload-podcast-videos`, formData, {
                params: { randomId: randomId },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                setIsLoading(false)
                setVideoArray(response.data?.user?.podcast?.videos)
                setVideos([])
                Alert.alert("Update", "Podcast videos updated successfully!")
            } else {
                setIsLoading(false)
                Alert.alert("Error", "Something went wrong!")
            }

            console.log('Upload response:', response.data);
        } catch (error) {
            setIsLoading(false)
            console.error('Upload error:', error);
        }
    };

    const handleDeleteVideo = async (fileName) => {
        try {
            setIsLoadingDelete(true)
            const data = {
                userid,
                filename: fileName
            }
            const response = await ApiUrl.post(`/api/user/pvideo-delete`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                setIsLoadingDelete(false)
                dispatch(SetUserData(response?.data?.user))
                setVideoArray(response?.data?.user.podcast.videos)
                Alert.alert("Update", "Video Deleted successfully!")
            } else {
                setIsLoadingDelete(false)

                Alert.alert("Error", "Something went wrong!")
            }

        } catch (error) {
            setIsLoadingDelete(false)

            console.error('Upload error:', error);
        }
    };

    const handleUpdatePodcastImage = async () => {

        try {
            setIsLoadingImage(true)
            const formData = new FormData();
            // Append the selected image to FormData
            formData.append('avatar', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
            formData.append('oldimage', imageLocalPath)
            formData.append('userid', userid)

            const randomId = uuidv4.v4()
            const response = await ApiUrl.post(`/api/user/pimage-update`, formData, {
                params: { randomId: randomId },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                setIsLoadingImage(false)
                Alert.alert("Update", "Image updated successfully!")
            } else {
                setIsLoadingImage(false)
                Alert.alert("Error", "Something went wrong!")
            }

        } catch (error) {
            setIsLoadingImage(false)

            console.error('Upload error:', error);
        }
    };

    const handleUpdatePodcastDescription = async (fileName) => {
        try {
            setIsLoadingDes(true)
            const formData = { description, userid }
            const response = await ApiUrl.post(`/api/user/pdesc-update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                setIsLoadingDes(false)
                Alert.alert("Update", "Description updated successfully!")
            } else {
                setIsLoadingDes(false)

                Alert.alert("Error", "Something went wrong!")
            }
        } catch (error) {
            setIsLoadingDes(false)

            console.error('Upload error:', error);
        }
    };

    const handleUpdatePodcastCategory = async () => {
        try {
            setIsLoadingCat(true)
            const formData = { category, userid }
            const response = await ApiUrl.post(`/api/user/pcategory-update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                setIsLoadingCat(false)
                Alert.alert("Update", "Category updated successfully!")
            } else {
                setIsLoadingCat(false)
                Alert.alert("Error", "Something went wrong!")
            }

        } catch (error) {
            setIsLoadingCat(false)
            console.error('Upload error:', error);
        }
    };
    const removeLocalVideo = (indexToRemove) => {
        // Create a copy of the array
        const updatedDataList = [...videos];
        // Use splice to remove the object at the specified index
        updatedDataList.splice(indexToRemove, 1);
        // Update the state with the new array
        setVideos(updatedDataList);
    };

    return (
        <ScrollView style={{ flex: 1 }} className="bg-black">
            <HeaderTitle icon={true} title={'Update Podcast'} />
            <SafeAreaView className='p-3 mt-7' style={{ marginBottom: scale(50) }}>
                <TextInput
                    value={description}
                    placeholder='Description'
                    textAlignVertical='top'
                    className='rounded-lg'
                    onChangeText={text => setDescription(text)}
                    multiline={true}
                    numberOfLines={5}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'black'}
                    style={{color:'black', paddingHorizontal:scale(15), backgroundColor: 'white'}}
                />
                <View style={{ marginVertical: scale(15) }}>
                    <CustomButtons isLoading={isLoadingDes} disable={isLoadingDes} textColor={'white_color'} color={'brown_darker'} title={'Update Description'} onClick={() => handleUpdatePodcastDescription()} />
                </View>
                <SelectDropdown
                    searchPlaceHolder='Search...'
                    defaultButtonText={category}
                    buttonStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: 8,
                        borderColor: '#ccc',
                        width: '100%',
                        marginTop: 20
                    }}
                    dropdownStyle={{ borderRadius: 8 }}
                    search
                    data={nicheItems.map(item => item.title)}
                    onSelect={(selectedItem, index) => {
                        setCategory(selectedItem)

                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
                <View style={{ marginVertical: scale(15) }}>
                    <CustomButtons isLoading={isLoadingCat} disable={isLoadingCat} textColor={'white_color'} color={'brown_darker'} title={'Update Category'} onClick={() => handleUpdatePodcastCategory()} />
                </View>
                <View className='flex-1 justify-center items-center mt-4'>
                    {imageLocalPath && <Image className='rounded-lg' source={{ uri: imageLocalPath }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} />}
                </View>
                <View style={{ marginVertical: scale(15) }}>
                    <CustomButtons color={'white_color'} textColor={'black'} title={'Upload Image'} onClick={() => openImagePicker()} />

                </View>
                {
                    image && <CustomButtons isLoading={isLoadingImage} disable={isLoadingImage} textColor={'white_color'} color={'brown_darker'} title={'Update Image'} onClick={() => handleUpdatePodcastImage()} />
                }
                <View className='flex-1 justify-center items-center'>
                    <FlatList
                        data={videoArry}
                        horizontal={true}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity
                                key={index}
                                className={`m-2 rounded-lg drop-shadow-lg`}
                                disabled={isLoadingDelete}
                                style={{ height: responsiveHeight(17), width: responsiveWidth(15) }}
                            >
                                <Text className='text-white_color my-1 bg-red_darker text-center rounded-sm' style={{ fontSize: responsiveFontSize(1.3) }} onPress={() => {
                                    handleDeleteVideo(item)
                                }}>{isLoadingDelete ? 'Deleting...' : 'Delete'}</Text>
                                {/* <Video className='rounded-lg' source={{ uri: podcastData.user ? item.uri : `${item}` }} width={responsiveWidth(15)} resizeMode='contain' height={responsiveHeight(15)} /> */}
                                <Video style={{ height: '100%' }} paused={false} className='rounded-lg' source={{ uri: `${item}` }} width={responsiveWidth(15)} resizeMode='cover' height={responsiveHeight(15)} />

                            </TouchableOpacity>
                        }

                        }
                    />
                </View>
                <View style={{ marginVertical: scale(15) }}>
                    <CustomButtons title={'Add New Video'} textColor={'black'} color={'white_color'} onClick={() => openVideoPicker()} />
                </View>
                <View className='flex-1 justify-center items-center'>
                    <FlatList
                        data={videos}
                        horizontal={true}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity
                                key={index}
                                className={`m-2 rounded-lg drop-shadow-lg`}
                                style={{ height: responsiveHeight(17), width: responsiveWidth(15) }}
                            >
                                <Text className='text-white_color my-1 bg-red_darker text-center rounded-sm' style={{ fontSize: responsiveFontSize(1.3) }} onPress={() => {
                                    removeLocalVideo(index)
                                }}>Remove</Text>
                                <Video style={{ height: '100%' }} paused={false} className='rounded-lg' source={{ uri: `${item}` }} width={responsiveWidth(15)} resizeMode='cover' height={responsiveHeight(15)} />

                            </TouchableOpacity>
                        }

                        }
                    />
                </View>
                <View style={{ marginVertical: scale(15) }}>
                    <CustomButtons isLoading={isLoading} disable={isLoading} textColor={'white_color'} color={'brown_darker'} title={'Upload Videos'} onClick={handleUpdateVideos} />
                </View>

            </SafeAreaView>
        </ScrollView>

    );
};

export default UpdatePodCast;