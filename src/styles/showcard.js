import { StyleSheet } from "react-native";

export const ShadowCardStyle = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    elevation: {
        elevation: 3,
        shadowColor: '#52006A',
    },
});

