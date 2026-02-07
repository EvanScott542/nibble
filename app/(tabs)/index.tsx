import { View } from 'react-native';

import FeedScreen from '../features/feed';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <FeedScreen />
    </View>
  );
}
