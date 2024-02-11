import React, { useState } from 'react';
import { View, Dimensions, SafeAreaView} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import SingleReel from '../../components/podcast/SingleReel';
import HeaderTitle from '../../components/podcast/HeaderTitle';
const YourVideos = () => {
  const reelsData = [
    {
      id: 1,
      channelName: 'cutedog',
      uri: 'https://v.pinimg.com/videos/mc/720p/f6/88/88/f68888290d70aca3cbd4ad9cd3aa732f.mp4',
      caption: 'Cute dog shaking hands #cute #puppy',
      musicName: 'Song #1',
      likes: 4321,
      comments: 2841,
      avatarUri: 'https://wallpaperaccess.com/full/1669289.jpg',
    },
    {
      id: 2,
      channelName: 'meow',
      uri: 'https://v.pinimg.com/videos/mc/720p/11/05/2c/11052c35282355459147eabe31cf3c75.mp4',
      caption: 'Doggies eating candy #cute #puppy',
      musicName: 'Song #2',
      likes: 2411,
      comments: 1222,
      avatarUri: 'https://wallpaperaccess.com/thumb/266770.jpg',
    },
    {
      id: 3,
      channelName: 'yummy',
      uri: 'https://v.pinimg.com/videos/mc/720p/c9/22/d8/c922d8391146cc2fdbeb367e8da0d61f.mp4',
      caption: 'Brown little puppy #cute #puppy',
      musicName: 'Song #3',
      likes: 3100,
      comments: 801,
      avatarUri: 'https://wallpaperaccess.com/thumb/384178.jpg',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <SafeAreaView>
        <HeaderTitle icon={true} title={"Your Videos"} />

        <View style={{
      width: windowWidth,
      height: windowHeight,
      backgroundColor: 'white',
      position: 'relative',
      backgroundColor: 'black',
    }}>
      <SwiperFlatList
        vertical={true}
        onChangeIndex={handleChangeIndexValue}
        data={reelsData}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SingleReel item={item} index={index} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
    </SafeAreaView>
  );
};


export default YourVideos;
