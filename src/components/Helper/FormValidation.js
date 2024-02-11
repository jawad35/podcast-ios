import { Alert } from "react-native";

export const UserFormValidation = (fullname, email, password) => {
    
    if (!fullname) {
        Alert.alert('Error', 'Fullname field is required!');
        return false;
    }
    if (!email) {
        Alert.alert('Error', 'Email field is required!');
        return false;
    }
    if (!password) {
        Alert.alert('Error', 'Password field is required!');
        return false;
    }
    return true
}