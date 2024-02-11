import { Alert } from "react-native";
import { ApiUrl } from "../../constants/globalUrl";
import { SetUserData } from "../../redux/PodcastUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginController = async (email, password, navigation, isSocailLogin, dispatch, setIsLoading) => {
    if (!email) {
        Alert.alert('Error', 'Email field is required!');
        return;
    }
    if (!isSocailLogin) {
        if (!password) {
            Alert.alert('Error', 'Password field is required!');
            return;
        }
    }
    try {
        const data = {
            email,
            password,
            isSocailLogin
        }
        setIsLoading(true)
        const response = await ApiUrl.post(`/api/user/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.data.success) {
            setIsLoading(false)

            Alert.alert('Error', response.data.error);
        } else {
            setIsLoading(false)

            dispatch(SetUserData(response.data.user))
            await AsyncStorage.setItem('isLogged', response?.data?.user._id)
            navigation.navigate('Parent')
            return response.data
            // const storeData = async () => {
            //     try {
            //       await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
            //       console.log('Data stored successfully');
            //     } catch (error) {
            //       console.error('Error storing data:', error);
            //     }
            //   };
            //   storeData()
        }
    } catch (error) {
        Alert.alert('Error', 'Something went wrong!');
        console.error('Upload error:', error);
        setIsLoading(false)

    }
}