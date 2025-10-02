import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function IngredientChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : styles.unselected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  unselected: {
    backgroundColor: '#f0f2f5',
  },
  selected: {
    backgroundColor: '#1e90ff',
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: '#111',
    fontSize: 14,
  },
  textSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
