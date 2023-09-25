import { FlatList } from 'react-native';
import { tracks } from '../../assets/data/tracks';
import TrackListItem from '../../components/TrackListItem';

const HomeScreen = () => {
  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => <TrackListItem track={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;
