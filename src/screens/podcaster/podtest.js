import React from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const Gallery = () => {
  const images = [
    'https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png',
    'https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png',
    'http://172.20.10.3:8003/uploads/Screenshot_20240120-085310.jpg-260b2bfa-836b-4081-8bfe-ab102eb79192.jpg'

    // Add more image URLs as needed
  ];

  const windowWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {images.map((imageUrl, index) => (
        <View key={index} style={[styles.imageContainer, { width: windowWidth / 3 - 12 }]}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  imageContainer: {
    aspectRatio: 1, // Maintain the aspect ratio of the images
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the entire container
  },
});

export default Gallery;
