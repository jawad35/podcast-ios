import React from 'react'
import { StyleSheet, View } from 'react-native';

function GridView(props) {
    const { data, col = 3, renderItem } = props;
    return (
        <View style={styles.container}>
            {data.map((item, index) => {
                return (
                    <View key={index} style={{ width: 100 / col + '%' }}>
                        <View style={{ padding: 5 }}>{renderItem(item)}</View>
                    </View>
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {width: '100%', flexDirection: 'row', flexWrap: 'wrap'},
  });
export default GridView