import { Ionicons } from '@expo/vector-icons';
import { AVPlaybackStatus, Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { Text, View } from './Themed';

const Player = () => {
  const track = useSelector((state: RootState) => state.player.track);
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlaybackSTatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    setIsPlaying(status.isPlaying);
  };

  const playTrack = async () => {
    if (sound) await sound.unloadAsync();

    if (!track?.preview_url) return;

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.preview_url,
    });
    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(onPlaybackSTatusUpdate);
    await newSound.playAsync();
  };

  const onPlayPause = async () => {
    if (!sound) return;

    if (isPlaying) await sound.pauseAsync();
    else await sound.playAsync();
  };

  useEffect(() => {
    playTrack();
  }, [track]);

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (!track) return null;
  const image = track.album.images?.[0];

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        {image && <Image source={{ uri: image.url }} style={styles.image} />}

        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Text style={styles.title}>{track.name}</Text>
          <Text style={styles.subTitle}>{track.artists[0]?.name}</Text>
        </View>

        <Ionicons
          name="heart-outline"
          size={20}
          color="white"
          style={{ marginHorizontal: 8 }}
        />

        <Ionicons
          onPress={onPlayPause}
          disabled={!track?.preview_url}
          name={isPlaying ? 'pause' : 'play'}
          size={24}
          color={track?.preview_url ? 'white' : 'gray'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -76,
    width: '100%',
    height: 76,
    padding: 12,
    backgroundColor: 'transparent',
  },
  player: {
    backgroundColor: '#286660',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    padding: 4,
    paddingRight: 16,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    marginRight: 12,
    borderRadius: 4,
  },
  title: {
    color: 'white',
  },
  subTitle: {
    color: 'lightgrey',
    fontSize: 12,
  },
});

export default Player;
