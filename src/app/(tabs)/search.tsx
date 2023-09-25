import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tracks } from '../../assets/data/tracks';
import { Text, View } from '../../components/Themed';
import TrackListItem from '../../components/TrackListItem';

export default function SearchScreen() {
  const theme = useColorScheme();

  const [search, setSearch] = useState('');
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
