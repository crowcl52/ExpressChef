import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useAppStore } from '../../../store/useAppStore';
import * as Haptics from 'expo-haptics';
import type { Recipe } from '../../../domain/types';

export default function RecipeDetail({ route }: any) {
  const recipe: Recipe = route.params?.recipe;
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  const isFav = !!favorites[recipe.id];

  const onToggle = () => {
    toggleFavorite(recipe);
    Haptics.selectionAsync();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Pressable onPress={onToggle} style={styles.saveBtn} accessibilityRole="button" accessibilityLabel="Guardar">
          <Text style={{ color: '#fff' }}>{isFav ? 'Guardada' : 'Guardar'}</Text>
        </Pressable>
      </View>
      <Text style={styles.meta}>{recipe.timeMinutes} min · {recipe.servings} porciones</Text>
      <Text style={styles.section}>Ingredientes</Text>
      <FlatList
        data={recipe.ingredients}
        keyExtractor={(item, idx) => item.name + idx}
        renderItem={({ item }) => <Text style={styles.item}>• {item.name}{item.qty ? ` (${item.qty})` : ''}</Text>}
      />
      <Text style={styles.section}>Pasos</Text>
      {recipe.steps.map((s, i) => (
        <Text key={i} style={styles.item}>{i + 1}. {s}</Text>
      ))}
      {recipe.substitutions && recipe.substitutions.length > 0 && (
        <>
          <Text style={styles.section}>Sustituciones</Text>
          {recipe.substitutions.map((s, i) => (
            <Text key={i} style={styles.item}>{s.from} → {s.to}</Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: '700', flex: 1, marginRight: 12 },
  meta: { marginVertical: 8, color: '#666' },
  section: { marginTop: 16, fontSize: 16, fontWeight: '700' },
  item: { marginTop: 6, fontSize: 15, color: '#222' },
  saveBtn: { backgroundColor: '#1e90ff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
});
