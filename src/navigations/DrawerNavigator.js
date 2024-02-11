import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Main from './Main';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import PodProfile from '../screens/podcaster/PodProfile';
import CreatePodCast from '../screens/podcaster/CreatePodCast';
import PodPosts from '../screens/podcaster/PodPosts';
import UpdatePodCast from '../screens/podcaster/UpdatePodcast';
import CreateShort from '../screens/podcaster/CreateShort';
import Logout from '../screens/authScreens/Logout';
import { useSelector } from 'react-redux';
import CustomDrawerContent from '../components/Items/CustomDrawerContent';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const podcastData = useSelector(state => state.userData)

  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={PodProfile}
        initialParams={{ userid: podcastData?.user?._id }}
        options={{ headerShown: false }}
      />
      {
        podcastData?.user?.role === '2' && <Drawer.Screen
          name="Create Podcast"
          component={CreatePodCast}
          options={{ headerShown: false }}
        />
      }
      {
        podcastData?.user?.role === '2' && <Drawer.Screen
          name="Update Podcast"
          component={UpdatePodCast}
          options={{ headerShown: false }}
        />
      }
      {
        podcastData?.user?.role === '2' && <Drawer.Screen
          name="Upload Short"
          component={CreateShort}
          options={{ headerShown: false }}
        />
      }



      {/* <Drawer.Screen
        name="Podcast"
        component={PodPosts}
        options={{ headerShown: false }}
      /> */}
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;