import { AVPlaybackSource } from 'expo-av';

import { getVideoAsset } from '@/constants/video-assets';
import feedData from '@/data/feed.json';
import { FeedItem, ResolvedFeedItem } from '@/types/feed';

export type { FeedItem, ResolvedFeedItem };

function resolveVideoSource(videoUrl: string): AVPlaybackSource {
  if (videoUrl.startsWith('local:')) {
    const key = videoUrl.slice(6);
    const asset = getVideoAsset(key);
    if (asset !== undefined) {
      return asset;
    }
  }
  return { uri: videoUrl };
}

export async function fetchFeed(): Promise<ResolvedFeedItem[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (feedData as FeedItem[]).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    thumbnailUrl: item.thumbnailUrl,
    videoSource: resolveVideoSource(item.videoUrl),
  }));
}
