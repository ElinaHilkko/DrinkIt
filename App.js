import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import RandomScreen from './RandomScreen';
import OwnScreen from './OwnScreen';
import DrinkOfSearchScreen from './DrinkOfSearchScreen';
import DrinkOfOwnScreen from './DrinkOfOwnScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Home' 
          component={HomeScreen} 
          options={{ 
            title: 'My home',
            headerStyle: { backgroundColor: '#6D9E95' },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen 
          name='Search' 
          component={SearchScreen} 
          options={{ 
            title: 'Search Drink',
            headerStyle: { backgroundColor: '#6D9E95' },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen 
          name='Random' 
          component={RandomScreen} 
          options={{ 
            title: 'Random Drink',
            headerStyle: { backgroundColor: '#6D9E95' },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen 
          name='Own' 
          component={OwnScreen} 
          options={{ 
            title: 'Own drinks',
            headerStyle: { backgroundColor: '#6D9E95' },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen 
          name='DrinkOfSearch' 
          component={DrinkOfSearchScreen} 
          options={{ 
            title: 'Details of drink',
            headerStyle: { backgroundColor: '#6D9E95' },
            headerTintColor: '#fff'
          }} 
        />
        <Stack.Screen 
          name='DrinkOfOwn' 
          component={DrinkOfOwnScreen} 
          options={{ 
            title: 'Details of own drink',
            headerStyle: { backgroundColor: '#6D9E95' },
            headerTintColor: '#fff'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};