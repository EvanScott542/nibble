export interface Video {
  id: string;
  userId: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface VideoUploadRequest {
  title: string;
  description?: string;
  mimeType: string;
  fileSize: number;
}

export interface VideoUploadResponse {
  videoId: string;
  uploadUrl: string;
  expiresAt: string;
}
