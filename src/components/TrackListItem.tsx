import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Track } from '../types';
import { Text, View } from './Themed';

type ITrackListItem = {
  track: Track;
};

const TrackListItem: React.FC<ITrackListItem> = ({ track }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: track.album.images[0]?.url }}
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>{track.name}</Text>
        <Text style={styles.subTitle}>{track.artists[0]?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginVertical: 4,
    padding: 4,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
  },
  subTitle: {
    color: 'gray',
  },
  image: {
    width: 48,
    aspectRatio: 1,
    borderRadius: 4,
  },
});

export default TrackListItem;
