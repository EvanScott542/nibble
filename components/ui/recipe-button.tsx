import { CookingPot } from 'lucide-react-native';
import { Pressable, StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';
import { ResolvedFeedItem } from '@/types/feed';

interface RecipeButtonProps {
  item: ResolvedFeedItem | null;
  onPress: (item: ResolvedFeedItem) => void;
}

export default function RecipeButton({ item, onPress }: RecipeButtonProps) {
  return (
    <Pressable
      style={[styles.button, !item && styles.disabled]}
      onPress={() => item && onPress(item)}
      disabled={!item}>
      <CookingPot color={Colors.textOnAccent} size={28} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
