import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ShadowCardStyle } from '../../styles/showcard'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log(data, 'helo')
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

const FacebookSignInButton = () => {
  return (
    <TouchableOpacity onPress={onFacebookButtonPress} className="p-2 rounded-2xl">
    <View className='bg-white_color py-1 px-2' style={[ShadowCardStyle.card, ShadowCardStyle.elevation]}>
        <Image source={require('../../assets/icons/facebook.png')}
            className="w-10 h-10" />
    </View>
</TouchableOpacity>
  )
}

export default FacebookSignInButton