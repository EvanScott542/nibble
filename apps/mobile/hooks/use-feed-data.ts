import { useEffect, useState } from 'react';

import { fetchFeed } from '@/services/feed-service';
import { ResolvedFeedItem } from '@/types/feed';

export function useFeedData() {
  const [items, setItems] = useState<ResolvedFeedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    fetchFeed()
      .then((data) => {
        if (!cancelled) {
          setItems(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load feed');
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const activeItem = items[activeIndex] ?? null;

  return { items, activeIndex, setActiveIndex, activeItem, isLoading, error };
}
