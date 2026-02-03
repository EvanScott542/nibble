import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Play, Pause } from 'lucide-react-native';

export interface VideoPlayerProps {
  source: string;
  isActive: boolean;
  posterSource?: string;
  isMuted?: boolean;
}

export default function VideoPlayer({
  source,
  isActive,
  posterSource,
  isMuted = false,
}: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const iconTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.playAsync();
    } else {
      videoRef.current?.pauseAsync();
    }
  }, [isActive]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }

    setShowIcon(true);
    if (iconTimeoutRef.current) {
      clearTimeout(iconTimeoutRef.current);
    }
    iconTimeoutRef.current = setTimeout(() => {
      setShowIcon(false);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (iconTimeoutRef.current) {
        clearTimeout(iconTimeoutRef.current);
      }
    };
  }, []);

  const IconComponent = isPlaying ? Pause : Play;

  return (
    <Pressable style={styles.container} onPress={togglePlayPause}>
      <Video
        ref={videoRef}
        source={{ uri: source }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted={isMuted}
        posterSource={posterSource ? { uri: posterSource } : undefined}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
      {showIcon && (
        <View style={styles.iconOverlay}>
          <View style={styles.iconBackground}>
            <IconComponent color="#fff" size={32} />
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  iconOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
