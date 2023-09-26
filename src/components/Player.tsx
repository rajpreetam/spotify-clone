import { gql, useMutation, useQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { AVPlaybackStatus, Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { Text, View } from './Themed';

const insertFavouriteMutation = gql`
  mutation MyMutation($trackId: String!, $userId: String!) {
    insertFavorites(track_id: $trackId, user_id: $userId) {
      id
      track_id
      user_id
    }
  }
`;

const isFavouriteQuery = gql`
  query MyQuery($trackId: String!, $userId: String!) {
    favoritesByTrack_idAndUser_id(track_id: $trackId, user_id: $userId) {
      id
      track_id
      user_id
    }
  }
`;

const deleteFavouriteMutation = gql`
  mutation MyMutation($trackId: String!, $userId: String!) {
    deleteFavorites(track_id: $trackId, user_id: $userId) {
      id
    }
  }
`;

const Player = () => {
  const track = useSelector((state: RootState) => state.player.track);
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  const [insertFavourite] = useMutation(insertFavouriteMutation);
  const [deleteFavourite] = useMutation(deleteFavouriteMutation);

  const { data, refetch } = useQuery(isFavouriteQuery, {
    variables: { userId: 'Preetam', trackId: track?.id ?? '' },
  });

  const isLiked = data?.favoritesByTrack_idAndUser_id?.length > 0;

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

  const onLike = async () => {
    if (!track) return;

    if (isLiked) {
      await deleteFavourite({
        variables: { userId: 'Preetam', trackId: track?.id },
      });
    } else {
      await insertFavourite({
        variables: { userId: 'Preetam', trackId: track?.id },
      });
    }
    refetch();
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

        <TouchableOpacity onPress={onLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color="white"
            style={{ marginHorizontal: 8 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPause}>
          <Ionicons
            disabled={!track?.preview_url}
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color={track?.preview_url ? 'white' : 'gray'}
          />
        </TouchableOpacity>
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
