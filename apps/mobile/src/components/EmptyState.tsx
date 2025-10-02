import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.container} accessibilityRole="summary">
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  },
});
