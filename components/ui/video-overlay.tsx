import { StyleSheet, Text, View } from 'react-native';

interface VideoOverlayProps {
  title: string;
  description: string;
}

export default function VideoOverlay({ title, description }: VideoOverlayProps) {
  return (
    <View style={styles.overlay} pointerEvents="none">
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 80,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginTop: 4,
  },
});
