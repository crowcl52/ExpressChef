import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScoreBadge({ score }: { score: number }) {
  const color = score >= 6 ? '#16a34a' : score >= 3 ? '#f59e0b' : '#ef4444';
  return (
    <View style={[styles.badge, { backgroundColor: color }]}> 
      <Text style={styles.text}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});
