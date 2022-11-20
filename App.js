import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import RandomScreen from './RandomScreen';
import OwnScreen from './OwnScreen';
import DrinkOfSearchScreen from './DrinkOfSearchScreen';
import DrinkOfOwnScreen from './DrinkOfOwnScreen';
import LoginScreen from './LoginScreen';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  function onAuthenticate () {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter password',
    });
    auth.then(result => {
      setIsAuthenticated(result.success);
    });
  }

  return (
    <NavigationContainer>
      { isAuthenticated 
        ? <Stack.Navigator>
          <Stack.Screen
            name='Home' 
            component={HomeScreen} 
            options={{ 
              title: 'My Home',
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
              title: 'Own Drinks',
              headerStyle: { backgroundColor: '#6D9E95' },
              headerTintColor: '#fff'
            }} 
          />
          <Stack.Screen 
            name='DrinkOfSearch' 
            component={DrinkOfSearchScreen} 
            options={{ 
              title: 'Details of Drink',
              headerStyle: { backgroundColor: '#6D9E95' },
              headerTintColor: '#fff'
            }} 
          />
          <Stack.Screen 
            name='DrinkOfOwn' 
            component={DrinkOfOwnScreen} 
            options={{ 
              title: 'Details of Own Drink',
              headerStyle: { backgroundColor: '#6D9E95' },
              headerTintColor: '#fff'
            }} 
          />
        </Stack.Navigator> 
        : <LoginScreen onAuthenticate={onAuthenticate} /> 
      }
    </NavigationContainer>
  );
};