import { CookingPot } from 'lucide-react-native';
import { Pressable, StyleSheet } from 'react-native';

export default function RecipeButton() {
  return (
    <Pressable style={styles.button} onPress={() => {}}>
      <CookingPot color="#fff" size={28} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e85d04',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
