import { useCallback, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import FeedItemCard from '@/components/feed-item-card';
import { ResolvedFeedItem } from '@/types/feed';

interface FeedListProps {
  items: ResolvedFeedItem[];
  activeIndex: number;
  isFocused: boolean;
  onActiveChange: (index: number) => void;
  itemHeight: number;
}

export default function FeedList({
  items,
  activeIndex,
  isFocused,
  onActiveChange,
  itemHeight,
}: FeedListProps) {
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      onActiveChange(viewableItems[0].index);
    }
  }).current;

  const renderItem = useCallback(
    ({ item, index }: { item: ResolvedFeedItem; index: number }) => (
      <FeedItemCard item={item} isActive={isFocused && index === activeIndex} height={itemHeight} />
    ),
    [activeIndex, isFocused, itemHeight],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      getItemLayout={(_, index) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index,
      })}
      renderItem={renderItem}
    />
  );
}
