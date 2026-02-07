import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import VideoOverlay from '@/components/ui/video-overlay';
import VideoPlayer from '@/components/ui/video-player';
import { ResolvedFeedItem } from '@/types/feed';

interface FeedItemCardProps {
  item: ResolvedFeedItem;
  isActive: boolean;
  height: number;
}

function FeedItemCard({ item, isActive, height }: FeedItemCardProps) {
  return (
    <View style={[styles.item, { height }]}>
      <VideoPlayer source={item.videoSource} isActive={isActive} posterSource={item.thumbnailUrl} />
      <VideoOverlay title={item.title} description={item.description} />
    </View>
  );
}

export default memo(FeedItemCard);

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
});
