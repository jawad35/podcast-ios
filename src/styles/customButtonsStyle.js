import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const customButtonsStyles = StyleSheet.create({
    buttonWrapper:{
        width:'100%',
        height:scale(40),
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        fontWeight:'500'
    }
})

export default customButtonsStyles