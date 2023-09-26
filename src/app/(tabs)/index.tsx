import { gql, useQuery } from '@apollo/client';
import { ActivityIndicator, FlatList } from 'react-native';
import { Text } from '../../components/Themed';
import TrackListItem from '../../components/TrackListItem';

const query = gql`
  query MyQuery($genres: String!) {
    recommendations(seed_genres: $genres) {
      tracks {
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

const HomeScreen = () => {
  const { data, loading, error } = useQuery(query, {
    variables: { genres: 'indian, indie-pop' },
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Failed to load recommended tracks</Text>;

  const tracks = data?.recommendations?.tracks || [];

  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => <TrackListItem track={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;
