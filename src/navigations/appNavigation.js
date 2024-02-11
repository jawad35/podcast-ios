import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/mainScreens/HomeScreen.js';
import WelcomeScreen from '../screens/mainScreens/WelcomeScreen.js';
import LoginScreen from '../screens/authScreens/LoginScreen.js';
import SignUpScreen from '../screens/authScreens/SignUpScreen.js';
import SuggestedSelections from '../screens/starterScreens/SuggestedSelections.js';
import ForgetPassword from '../screens/authScreens/ForgetPassword.js';
import CodeVerification from '../screens/authScreens/CodeVerification.js';
import ChangePassword from '../screens/authScreens/ChangePassword.js';
import PodProfile from '../screens/podcaster/PodProfile.js';
import Parent from './Parent.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CategoryPodcasts from '../screens/podcaster/CategoryPodcasts.js';
import PasswordVerification from '../screens/authScreens/PasswordVerification.js';
import YourVideos from '../screens/podcaster/YourVideos.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../components/Items/CustomLoader.js';
import UpdatePodProfile from '../screens/podcaster/UpdatePodProfile.js';
import UpdatePodCast from '../screens/podcaster/UpdatePodcast.js';
import PodCategories from '../screens/podcaster/PodCategories.js';
import stripeProducts from '../screens/stripe/stripeProducts.js';
import SelectUserRole from '../screens/podcaster/SelectUserRole.js';
import PackageDetails from '../screens/stripe/PackageDetails.js';
import AtStartSelectRole from '../screens/starterScreens/AtStartSelectRole.js';
import StartTrial from '../screens/starterScreens/StartTrial.js';
import StripeCheckout from '../screens/stripe/StripeCheckout.js';
import SingleShortVideo from '../screens/podcaster/SingleShortVideo.js';
// import { io } from 'socket.io-client';
// import socketServcies from '../socketClient.js';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
//   const socket = io('http://172.20.10.3:8000', {
//     transports: ['websocket']
// })
// socket.on("connect", () => {
//   console.log("Socket Connected");
// });
// socket.on("connect_error", (error) => {
//   console.log("Socket Error", error.message);
// });
  const dispatch = useDispatch();
  const [isUser, setUser] = useState(false)
  const podcastData = useSelector(state => state.userData)
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const data = await AsyncStorage.getItem('userData')
  //     const parseData = JSON.parse(data)
  //     dispatch(SetUserData(parseData))
  //     if (parseData.length !== 0) {
  //       setUser(true)
  //     } else {
  //       setUser(false)
  //     }
  //   }
  //   checkUser()
  // }, [])

  // if (!isUser) {
  //   return (
  //     <Stack.Navigator screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="Loader" options={{ headerShown: false }} component={CustomLoader} />
  //   </Stack.Navigator>
  //   )
  // }

  // useEffect(() => {
  //   console.log('k')
  //   socketServcies.initializeSocket()
  //   // socket.on('comment', 'hello')
  // }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="UserRole" options={{ headerShown: false }} component={SelectUserRole} />  */}
      <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} /> 
      <Stack.Screen name="Parent" options={{ headerShown: false }} component={Parent} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
      <Stack.Screen name="SuggestedSelections" options={{ headerShown: false }} component={SuggestedSelections} />
      <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} component={ForgetPassword} />
      <Stack.Screen name="CodeVerification" options={{ headerShown: false }} component={CodeVerification} />
      <Stack.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePassword} />
      <Stack.Screen name="PodProfile" options={{ headerShown: false }} component={PodProfile} />
      <Stack.Screen name="CategoryPodcasts" options={{ headerShown: false }} component={CategoryPodcasts} />
      <Stack.Screen name="PodCategories" options={{ headerShown: false }} component={PodCategories} />
      <Stack.Screen name="PasswordVerifcationCode" options={{ headerShown: false }} component={PasswordVerification} />
      <Stack.Screen name="YourVideos" options={{ headerShown: false }} component={YourVideos} />
      <Stack.Screen name="UpdatePodProfile" options={{ headerShown: false }} component={UpdatePodProfile} />
      <Stack.Screen name="UpdatePodcast" options={{ headerShown: false }} component={UpdatePodCast} />
      <Stack.Screen name="PackageDetails" options={{ headerShown: false }} component={PackageDetails} /> 
      <Stack.Screen name="AtStartSelectRole" options={{ headerShown: false }} component={AtStartSelectRole} /> 
      <Stack.Screen name="StartTrial" options={{ headerShown: false }} component={StartTrial} /> 
      <Stack.Screen name="SingleShortVideo" options={{ headerShown: false }} component={SingleShortVideo} /> 
      <Stack.Screen name="StripeProducts" options={{ headerShown: false }} component={stripeProducts} />
      <Stack.Screen name="Checkout" options={{ headerShown: false }} component={StripeCheckout} /> 
    </Stack.Navigator>
  )
}