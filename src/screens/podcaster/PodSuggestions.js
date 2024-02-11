import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import SingleReel from '../../components/podcast/SingleReel';
import { ApiUrl } from '../../constants/globalUrl';
import { useSelector } from 'react-redux';
const ReelsScreen = () => {
  const podcastData = useSelector(state => state.userData)
  const shortsData = useSelector(state => state.userData)
  const [shorts, setShorts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const GetShorts = async () => {
    const response = await ApiUrl.get(`/api/user/get-short-videos`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.success) {
      // GetSuggestVidoes(response.data.shorts)
      const randomVideos = response.data?.shorts?.sort(() => Math.random() - 0.5)
      const categoryOrder = podcastData.user.categories
      const sortedVideoData = randomVideos?.sort((a, b) => {
        const categoryAIndex = categoryOrder.indexOf(a.category);
        const categoryBIndex = categoryOrder.indexOf(b.category);

        // If category is not found in the order array, consider it at the end
        if (categoryAIndex === -1) return 1;
        if (categoryBIndex === -1) return -1;

        return categoryAIndex - categoryBIndex;
      });
      setShorts(sortedVideoData)
    }
  }
  useEffect(() => {
    GetShorts()
  }, [shortsData.shorts])
  return (
    <View style={{
      width: windowWidth,
      height: windowHeight,
      backgroundColor: 'white',
      position: 'relative',
      backgroundColor: 'black',
    }}>
      {
        shorts.length === 0 ? <View className='flex-1 justify-center items-center'><Text className='text-white_color'>No Videos</Text></View> : <SwiperFlatList
          vertical={true}
          onChangeIndex={handleChangeIndexValue}
          data={shorts}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <SingleReel icon={true} item={item} index={index} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
          )}
          keyExtractor={(item, index) => index}
        />
      }

    </View>
  );
};


export default ReelsScreen;
