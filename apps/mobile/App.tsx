import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchScreen from './src/app/(tabs)/search/SearchScreen';
import ResultsScreen from './src/app/(tabs)/results/ResultsScreen';
import FavoritesScreen from './src/app/(tabs)/favorites/FavoritesScreen';
import ProfileScreen from './src/app/(tabs)/profile/ProfileScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={DefaultTheme}>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
            tabBarLabelStyle: { fontSize: 12 },
          }}
        >
          <Tab.Screen name="Buscar" component={SearchScreen} />
          <Tab.Screen name="Recetas" component={ResultsScreen} />
          <Tab.Screen name="Favoritos" component={FavoritesScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
