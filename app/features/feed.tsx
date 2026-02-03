import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import RecipeButton from '@/components/ui/recipe-button';
import { FeedItem, fetchFeed } from '@/services/feed-service';

export default function FeedComponent() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const { height } = useWindowDimensions();

  useEffect(() => {
    fetchFeed().then(setItems);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={[styles.item, { height }]}>
            <Text style={styles.number}>{index + 1}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      <View style={styles.fabContainer}>
        <RecipeButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  item: {
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 120,
  },
  number: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '700',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginTop: 4,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});
