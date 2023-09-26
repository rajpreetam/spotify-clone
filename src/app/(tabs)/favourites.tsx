import { gql, useQuery } from '@apollo/client';
import { ActivityIndicator, FlatList } from 'react-native';
import TrackListItem from '../../components/TrackListItem';

const query = gql`
  query MyQuery($userId: String!) {
    favoritesByUser_id(user_id: $userId) {
      id
      track_id
      user_id
      track {
        id
        name
        preview_url
        artists {
          id
          name
        }
        album {
          id
          name
          images {
            height
            url
            width
          }
        }
      }
    }
  }
`;

const FavouritesScreen = () => {
  const { data, loading, error } = useQuery(query, {
    variables: { userId: 'Preetam' },
  });

  if (loading) return <ActivityIndicator />;

  const tracks = (data?.favoritesByUser_id ?? []).map((fav: any) => fav.track);

  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => <TrackListItem track={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default FavouritesScreen;
