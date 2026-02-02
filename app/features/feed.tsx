import RecipeButton from '@/components/recipe-button';
import { StyleSheet, View } from 'react-native';

export default function FeedComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.fabContainer}>
        <RecipeButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  fabContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 24,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
