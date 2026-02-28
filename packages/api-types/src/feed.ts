import type { Video } from './video';

export interface FeedItem {
  video: Video;
  recipeId?: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

export interface FeedResponse {
  items: FeedItem[];
  nextCursor?: string;
  hasMore: boolean;
}
