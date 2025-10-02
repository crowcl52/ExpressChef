import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useAppStore } from '../../../store/useAppStore';

export default function ProfileScreen() {
  const isPremium = useAppStore((s) => s.isPremium);
  const setPremium = useAppStore((s) => s.setPremium);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Premium</Text>
        <Switch value={isPremium} onValueChange={setPremium} />
      </View>
      <Text style={{ marginTop: 12, color: '#666' }}>
        Desbloquea packs extra y elimina anuncios.
      </Text>
    </View>
  );
}
