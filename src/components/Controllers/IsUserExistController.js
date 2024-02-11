import { Alert } from "react-native";
import { ApiUrl } from "../../constants/globalUrl";

export const IsUserExistController = async (email, setIsLoading) => {
    try {
        const postData = {
            email,
        }
        setIsLoading(true)

        const response = await ApiUrl.post(`/api/user/is-user-exist`, postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data.success) {
            setIsLoading(false)
            return true
        } else {
           return false
        }
    } catch (error) {
        setIsLoading(false)
        return false
        Alert.alert('Error', 'Something went wrong!');
    }
}