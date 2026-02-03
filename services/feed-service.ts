import feedData from '@/data/feed.json';

export type FeedItem = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
};

export async function fetchFeed(): Promise<FeedItem[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));
  return feedData as FeedItem[];
}
