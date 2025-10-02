import React, { useMemo, useState } from 'react';
import { View, TextInput, FlatList, Text, KeyboardAvoidingView, Platform } from 'react-native';
import IngredientChip from '../../../components/IngredientChip';
import common from '../../../data/ingredients.common.json';
import { normalizeText } from '../../../utils/normalize';
import { useAppStore } from '../../../store/useAppStore';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const have = useAppStore((s) => s.ingredientsHave);
  const add = useAppStore((s) => s.addIngredient);
  const remove = useAppStore((s) => s.removeIngredient);

  const suggestions = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return common;
    return common.filter((i) => normalizeText(i).includes(q));
  }, [query]);

  const onSubmit = () => {
    const norm = normalizeText(query);
    if (norm) {
      add(norm);
      setQuery('');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, padding: 12 }}>
      <TextInput
        placeholder="Añade ingredientes"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSubmit}
        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 8 }}
        returnKeyType="done"
      />

      <FlatList
        data={suggestions}
        numColumns={3}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <IngredientChip
            label={item}
            selected={have.includes(item)}
            onPress={() => (have.includes(item) ? remove(item) : add(item))}
          />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </KeyboardAvoidingView>
  );
}
