import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useAppStore } from '../../../store/useAppStore';
import RecipeCard from '../results/RecipeCard';

export default function FavoritesScreen({ navigation }: any) {
  const favorites = useAppStore((s) => Object.values(s.favorites));

  if (favorites.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text style={{ color: '#666', textAlign: 'center' }}>No hay favoritas aún</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} score={0} onPress={() => navigation.navigate('RecipeDetail', { recipe: item })} />
        )}
      />
    </View>
  );
}
