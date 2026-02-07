import { AVPlaybackSource } from 'expo-av';

export type FeedItem = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
};

export type ResolvedFeedItem = Omit<FeedItem, 'videoUrl'> & {
  videoSource: AVPlaybackSource;
};
