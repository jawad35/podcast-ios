import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const podProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between'
    },
    profileImage:{
        width:scale(100),
        height:scale(100)
    },
    emailText:{
        fontSize:scale(10),
        color:'white',
        textAlign:'center',
        marginVertical:verticalScale(10)
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateVerticalScale(72),
        justifyContent: 'center',
        marginBottom:moderateVerticalScale(40)
    },
    FollowBtn:{
        width:scale(100),
        height:scale(30),
        backgroundColor:'white',
        borderRadius:scale(10),
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    line:{
        borderBottomWidth:1,
        borderBottomColor:'white',
        marginVertical:13,
        marginHorizontal:10

    }
});

export default podProfileStyles