import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ScoreBadge from '../../../components/ScoreBadge';
import type { Recipe } from '../../../domain/types';

export default function RecipeCard({
  recipe,
  score,
  onPress,
}: {
  recipe: Recipe;
  score: number;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}> 
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title}</Text>
        <ScoreBadge score={score} />
      </View>
      <Text style={styles.meta}>{recipe.timeMinutes} min · {recipe.servings} porciones</Text>
      <Text style={styles.tags} numberOfLines={1}>{recipe.tags.join(' · ')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pressed: { opacity: 0.9 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 8 },
  meta: { color: '#555', marginTop: 4 },
  tags: { color: '#777', marginTop: 4 },
});
