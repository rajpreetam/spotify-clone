import { gql, useQuery } from '@apollo/client';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../../components/Themed';
import TrackListItem from '../../components/TrackListItem';

const query = gql`
  query MyQuery($q: String!) {
    search(q: $q) {
      tracks {
        items {
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
  }
`;

export default function SearchScreen() {
  const theme = useColorScheme();
  const [search, setSearch] = useState('');

  const { data, loading, error } = useQuery(query, {
    variables: { q: search },
  });

  const tracks = data?.search?.tracks?.items || [];

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <FontAwesome name="search" size={16} color="gray" />
        <TextInput
          placeholder="What do you want to listen to..."
          style={[
            styles.input,
            { backgroundColor: theme === 'light' ? 'lightgray' : '#121314' },
          ]}
          placeholderTextColor="gray"
          value={search}
          onChangeText={setSearch}
        />
        <Text onPress={() => setSearch('')}>Cancel</Text>
      </View>

      {loading && <ActivityIndicator />}
      {error && <Text>Failed to load recommended tracks</Text>}

      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#121314',
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 4,
    color: 'white',
  },
});
