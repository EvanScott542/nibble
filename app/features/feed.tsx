import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions, View, ViewToken } from 'react-native';

import RecipeButton from '@/components/ui/recipe-button';
import VideoPlayer from '@/components/ui/video-player';
import { FeedItem, fetchFeed } from '@/services/feed-service';

export default function FeedComponent() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { height } = useWindowDimensions();

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

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
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item, index }) => (
          <View style={[styles.item, { height }]}>
            <VideoPlayer
              source={item.videoUrl}
              isActive={index === activeIndex}
              posterSource={item.thumbnailUrl}
            />
            <View style={styles.overlay} pointerEvents="none">
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
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
    backgroundColor: '#000',
  },
  item: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 120,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
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
