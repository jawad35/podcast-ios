import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
const CustomDrawer = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Text
          style={{
            color: 'red',
            fontSize: 27,
            fontWeight: '700',
            marginLeft: 20,
          }}>
          Gmail
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;