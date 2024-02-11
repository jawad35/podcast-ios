import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, FlatList, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { ApiUrl, ServerUrl } from '../../constants/globalUrl'
import { scale, moderateVerticalScale } from 'react-native-size-matters';
import podProfileStyles from '../../styles/podProfileStyle'
import { PencilSquareIcon, TrashIcon } from 'react-native-heroicons/solid';
import { CheckIsFollowed } from '../../components/Helper/CheckIsFollowed';
import { defaultProfile, defaultVideoThumbnail } from '../../utils/Constants';
import GridView from '../../components/Grid/GridView';
import { MakeCompleteUrl } from '../../components/Helper/MakeCompleteUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PodProfile = ({ route }) => {
  const podcastData = useSelector(state => state.userData)
  const navigation = useNavigation()
  const [isFollow, setIsFollow] = useState(false)
  const [following, setFollowing] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [UserData, SetUserData] = useState({})
  const [UserShorts, SetUserShorts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const GetUserShorts = async () => {
    console.log('called')
    await ApiUrl.get(`/api/user/get-short-videos`).then(async (res) => {
      if (res.data.success) {
        const AllShorts = res.data?.shorts
        const userid = await AsyncStorage.getItem('isLogged')
        const filteredShorts = AllShorts?.filter(short => short.userid === userid)
        SetUserShorts(filteredShorts)
      }
    })
  }

  const GetUser = async () => {
    const response = await ApiUrl.post(`/api/user/getuser`, { userid: route?.params?.userid }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.data.success) {
      SetUserData(response.data?.user[0])
      const isExist = CheckIsFollowed(response.data?.user?.followers, podcastData?.user?.email)
      if (isExist) {
        setIsFollow(true)
      } else {
        setIsFollow(false)
      }
      setFollowing(response.data.user[0]?.following?.length)
      setFollowers(response.data.user[0]?.followers?.length)
    }
  }

  useEffect(() => {
    GetUser()
  }, [route?.params?.userid, podcastData])
  useEffect(() => {
    GetUserShorts()
  }, [])
  const FollowUser = async () => {
    try {
      setIsLoading(true)
      const postData = {
        id: podcastData.user._id,
        userid: route?.params?.userid,
        oname: UserData.fullname,
        uname: podcastData?.user?.fullname,
        uemail: podcastData?.user?.email,
        oemail: UserData.email
      }
      const response = await ApiUrl.post(`/api/user/follow`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setIsFollow(true)
        setIsLoading(false)
        setFollowers(response.data.followers)
        // setRefresh('1')

      }
    } catch (error) {
      setIsLoading(false)
      Alert.alert("Error", response.data.message)
    }
  }
  const UnFollowUser = async () => {
    try {
      setIsLoading(true)
      const postData = {
        id: podcastData.user._id,
        userid: route?.params?.userid
      }
      const response = await ApiUrl.post(`/api/user/unfollow`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setIsFollow(false)
        setIsLoading(false)

        setFollowers(response.data.followers)
        // setFollowing(response.data.following)
        // setRefresh('2')
      }
    } catch (error) {
      setIsLoading(false)

      // Alert.alert("Error", error)
      console.log(err)
    }
  }
  const handleDeleteVideo = async (item) => {
    try {
        setIsLoadingDelete(true)
        const data = {
            id: item._id,
            filename: item.video,
            thumbnail:item.thumbnail
        }
        const response = await ApiUrl.post(`/api/user/svideo-delete`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data.success) {
            setIsLoadingDelete(false)
            console.log(response.data, 'jkjk8')
            SetUserShorts(response.data.shorts)
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
  return (
    <SafeAreaView className='bg-black flex-1'>
      <HeaderTitle icon={true} title={'Profile'} />
      {
        podcastData?.user._id === route?.params?.userid && <View className='flex items-end absolute z-10' style={{ top: scale(60), right: scale(20) }}>
          <PencilSquareIcon onPress={() => navigation.navigate("UpdatePodProfile")} size={scale(25)} color={'white'} />
        </View>
      }
      <Text className={`text-white_color text-center`} style={{ marginVertical: scale(15) }}>{UserData?.fullname?.toUpperCase()}</Text>
      <View className='flex justify-center items-center'>
        <Image source={{ uri: UserData?.avatar ? MakeCompleteUrl(UserData?.avatar) : defaultProfile }}
          style={podProfileStyles.profileImage}
          resizeMode='cover'
          className='rounded-full'
        />
      </View>
      <Text style={podProfileStyles.emailText}>
        {UserData?.email}
      </Text>

      {
        podcastData?.user?._id !== route?.params?.userid && <View style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignContent: 'space-around', marginTop: scale(20) }}>
          <TouchableOpacity disabled={isLoading} style={podProfileStyles.FollowBtn} onPress={isFollow ? UnFollowUser : FollowUser}>
            <Text className='font-semibold text-black'>
              {isFollow ? isLoading ? 'Unfollowing...' : 'Unfollow' : isLoading ? 'Following...' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
      }

      <View style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignContent: 'space-around', marginTop: scale(0), marginHorizontal: scale(40) }}>
        <Text className='text-white_color'>Followers : {followers}</Text>
        <Text className='text-white_color'>Following : {following}</Text>
      </View>
      <View style={podProfileStyles.line}></View>
      <ScrollView>
        <GridView
          data={UserShorts}
          renderItem={(item) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('SingleShortVideo', item)}>
                <View style={styles.container}>
                  <TrashIcon onPress={() => handleDeleteVideo(item)} size={25} style={{ color: '#F40000', position: 'absolute', right: scale(15), top: scale(15), zIndex:7 }} />
                  <Image source={{ uri: item.thumbnail ? MakeCompleteUrl(item?.thumbnail) : defaultVideoThumbnail }} style={styles.image} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    position:'relative'
  },
  title: { color: "white", fontWeight: "bold", fontSize: 25 },
  imageContainer: {
    aspectRatio: 1, // Maintain the aspect ratio of the images
    marginBottom: 8,
    borderRadius: 8,
    padding: 4,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover', // Ensure the image covers the entire container
  },
});

export default PodProfile


