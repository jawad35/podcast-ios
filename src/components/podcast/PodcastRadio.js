import React, { useState, useEffect } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import Sound from 'react-native-sound';

const App = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    // Load the sound file from the URL
    const audioURL = 'https://streaming.radio.co/s82eae5d4a/listen';
    const sounddata = new Sound(audioURL, null, (error) => {
      if (error) {
        console.log('Failed to load the sounddata', error);
      }
    });
    setSound(sounddata)

    // Cleanup function to release the sound when the component unmounts
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const playSound = () => {
    console.log('wah play', sound)
    setIsPlaying(true)

    if (sound) {
      // Play the loaded sound
      sound.play((success) => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.error('Error playing sound');
        }
      });
    }
  };

  const pauseSound = () => {
    console.log('stop')
    if (sound) {
      sound.pause();
      setIsPlaying(false)
      console.log('Sound paused');
    }
  };


  return (
    <View>
      <Text style={{fontSize:scale(20), marginVertical:scale(15)}} className='text-white_color text-center font-bold'>Podcat Radio</Text>
      
      {
        isPlaying ?  <TouchableOpacity onPress={() => pauseSound()} className='bg-brown_darker flex items-center justify-center rounded-md' style={{height:scale(60)}}>
        <Text className='text-white_color text-center' style={{fontSize:scale(23)}}>Stop</Text>
      </TouchableOpacity> : <TouchableOpacity onPress={() => playSound()} className='bg-brown_darker flex items-center justify-center rounded-md' style={{height:scale(60)}}>
        <Text className='text-white_color text-center' style={{fontSize:scale(20)}}>Play</Text>
      </TouchableOpacity>
      }
    </View>
  );
};

export default App;
