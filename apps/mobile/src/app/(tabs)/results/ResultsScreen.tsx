import React, { useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { useAppStore } from '../../../store/useAppStore';
import { useRecipeSuggestor } from '../../../hooks/useRecipeSuggestor';
import RecipeCard from './RecipeCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeDetail from './RecipeDetail';
import { ads } from '../../../services/AdsProvider';

const Stack = createNativeStackNavigator();

function ResultsList({ navigation }: any) {
  const have = useAppStore((s) => s.ingredientsHave);
  const prefs = useAppStore((s) => s.prefs);
  const isPremium = useAppStore((s) => s.isPremium);

  const [maxTime, setMaxTime] = useState<number | undefined>(prefs.maxTimeMinutes);

  const results = useRecipeSuggestor(have, { ...prefs, maxTimeMinutes: maxTime }, isPremium);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Pressable onPress={() => setMaxTime(10)} style={{ padding: 8, backgroundColor: '#eee', borderRadius: 8 }}>
          <Text>≤10m</Text>
        </Pressable>
        <Pressable onPress={() => setMaxTime(15)} style={{ padding: 8, backgroundColor: '#eee', borderRadius: 8 }}>
          <Text>≤15m</Text>
        </Pressable>
        <Pressable onPress={() => setMaxTime(undefined)} style={{ padding: 8, backgroundColor: '#eee', borderRadius: 8 }}>
          <Text>Todos</Text>
        </Pressable>
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.recipe.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item.recipe}
            score={item.score.score}
            onPress={async () => {
              navigation.navigate('RecipeDetail', { recipe: item.recipe });
            }}
          />
        )}
      />
    </View>
  );
}

export default function ResultsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ResultsList" component={ResultsList} options={{ title: 'Recetas' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ title: 'Receta' }} />
    </Stack.Navigator>
  );
}
