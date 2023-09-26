import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { Text, View } from './Themed';

const Player = () => {
  const track = useSelector((state: RootState) => state.player.track);
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
          disabled={!track?.preview_url}
          name="play"
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
