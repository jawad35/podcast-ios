import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import React, { useState } from 'react';
import CustomShadow from '../../components/Items/CustomShadow';
import CustomButtons from '../../components/Items/CustomButtons';
import HeaderTitle from '../../components/podcast/HeaderTitle';
import nicheItems from '../../data/nicheItems';
import { launchImageLibrary } from 'react-native-image-picker';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ApiUrl } from '../../constants/globalUrl';
import uuidv4 from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { SetShortsData } from '../../redux/PodcastUsers';
import { scale } from 'react-native-size-matters';

const CreateShortVideos = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const podcastData = useSelector(state => state.userData)
  const [video, setVideo] = useState('')
  const [category, setCategory] = useState('')
  const [caption, setCaption] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [imageLocalPath, setImageLocalPath] = useState('')


  const openImagePicker = () => {
    launchImageLibrary({}, (response) => {
      if (!response.didCancel) {
        setImage(response.assets[0])
        setImageLocalPath(response.assets[0].uri)
      }
    });
  };

  const openVideoPicker = () => {
    const options = {
      mediaType: 'video',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel) {
        setVideo(response.assets[0])
      }
    });
  };


  const handleUpload = async () => {
    if (!caption) {
      return Alert.alert("Error", "Description field is required!")
    }
    if (!category) {
      return Alert.alert("Error", "Category field is required!")
    }
    if (!image) {
      return Alert.alert("Error", "Thumbnail field is required!")
    }
    if (video.length === 0) {
      return Alert.alert("Error", "At least one Video is required!")
    }
    try {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('thumbnail', {
        uri: image.uri,
        type: image.type,
        name: image.fileName || 'image.jpg',
      });

      formData.append('short', {
        uri: video.uri,
        type: video.type,
        name: video.fileName,
      });
      const randomId = uuidv4.v4()
      formData.append('caption', caption)
      formData.append('category', category)
      formData.append('userid', podcastData.user._id)
      const response = await ApiUrl.post(`/api/user/upload-short-videos`, formData, {
        params: { randomId: randomId },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setIsLoading(false)
        dispatch(SetShortsData(response.data.success))
        setCaption('')
        setCategory('')
        setVideo('')
        setImage('')
        setImageLocalPath('')
        Alert.alert("Short", "Short uploaded successfully!")
      } else {
        setIsLoading(false)

        Alert.alert("Error", "Something went wrong!")
      }
    } catch (error) {
      setIsLoading(false)

      console.error('Upload error:', error);
    }
  };
  console.log(video.uri)
  return (
    <ScrollView style={{ flex: 1 }} className="bg-black">
      <HeaderTitle icon={true} title={'Create Short'} />

      <SafeAreaView>
        <CustomShadow>
          <TextInput
            value={caption}
            placeholder='Caption'
            textAlignVertical='top'
            className='rounded-lg  mt-5'
            onChangeText={text => setCaption(text)}
            multiline={true}
            numberOfLines={5}
            maxLength={10}
            placeholderTextColor={'black'}
            style={{ color: 'black', paddingHorizontal: scale(15), backgroundColor: 'white' }}
            underlineColorAndroid='transparent'
          />
        </CustomShadow>
        <CustomShadow>
          <SelectDropdown
            searchPlaceHolder='Search...'
            defaultButtonText='Select category'
            buttonStyle={{
              backgroundColor: '#ffffff',
              borderRadius: 8,
              borderColor: '#ccc',
              width: '100%',
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
        </CustomShadow>
        <View className='flex-1 justify-center items-center'>
          {imageLocalPath && <Image className='rounded-lg' source={{ uri: imageLocalPath }} width={scale(100)} resizeMode='contain' height={scale(100)} />}
        </View>
        <CustomShadow>
          <CustomButtons title={'Upload Video Thumbnail'} color={'white_color'} textColor={'black'} onClick={() => openImagePicker()} />
        </CustomShadow>
        <View className='flex-1 justify-center items-center'>
          {
            video && <TouchableOpacity
              className={`m-2 rounded-lg drop-shadow-lg`}
              style={{ height: responsiveHeight(17), width: responsiveWidth(15) }}
            >
              {/* <Text className='text-white_color my-1 bg-red_darker text-center rounded-sm' style={{ fontSize: responsiveFontSize(1.3) }}>Remove</Text> */}
              <Video style={{ height: '100%' }} paused={false} className='rounded-lg' source={{ uri: video.uri }} width={responsiveWidth(15)} resizeMode='cover' height={responsiveHeight(15)} />
            </TouchableOpacity>
          }

        </View>
        <CustomShadow>
          <CustomButtons title={'Upload Short'} color={'white_color'} textColor={'black'} onClick={() => openVideoPicker()} />
        </CustomShadow>
        <CustomShadow>
          <CustomButtons isLoading={isLoading} disable={isLoading} textColor={'white_color'} color={'brown_darker'} title={'Create'} onClick={handleUpload} />
        </CustomShadow>
      </SafeAreaView>
    </ScrollView>

  );
};

export default CreateShortVideos;