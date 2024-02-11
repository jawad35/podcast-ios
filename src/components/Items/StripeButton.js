//import liraries
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';


const StripeButton = ({
    text = 'Pay Now',
    onPress = () => { },
    disabled = false,
    btnStyle = {},
    isLoading = false
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...styles.container,
                backgroundColor: !disabled ? '#D7654D' : 'grey',
                ...btnStyle,

            }}
            disabled={isLoading}
        >
            {isLoading ? <ActivityIndicator color={'white'} size={'small'} /> : <Text style={styles.textStyle}>{text}</Text>}


        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 42,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    }
});

//make this component available to the app
export default StripeButton;