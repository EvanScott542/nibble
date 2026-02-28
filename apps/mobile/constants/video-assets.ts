const videoAssets = {
  'sad-papi': require('@/data/sad-papi.mp4'),
} as const;

type VideoAssetKey = keyof typeof videoAssets;

export function getVideoAsset(key: string): number | undefined {
  return videoAssets[key as VideoAssetKey];
}

export function isLocalVideoKey(key: string): key is VideoAssetKey {
  return key in videoAssets;
}
