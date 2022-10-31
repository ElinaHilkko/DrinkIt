import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import { Button, Input, ListItem } from'react-native-elements';

export default function SearchScreen() {
  const [cocktail, setCocktail] = useState(); 
  const [ingredient, setIngredient] = useState('');
  //const [cocktails, setCocktails] = useState([]); //LISTA

  const findCocktailByName = async () => {
    const url = `www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
    } catch (error) {
        Alert.alert('Error', error);
    };
  }

  const findCocktailByIngredient = async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
    } catch (error) {
        Alert.alert('Error', error);
    };
  }

    return (
      <View style={styles.container}>
        <FlatList
        />
        <View style={styles.search}>
          <TextInput 
            style={styles.input} 
            placeholder='name'
            onChangeText={text => setCocktail(text)} 
          />
          <Button 
            buttonStyle={{ width: 150, backgroundColor: '#265F54' }}
            title="Find by name"
            onPress={findCocktailByName} 
          />
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.input} 
            placeholder='ingredient'
            onChangeText={text => setIngredient(text)} 
          />
          <Button 
            buttonStyle={{ width: 150, backgroundColor: '#265F54' }}
            title="Find by ingredient" 
            onPress={findCocktailByIngredient} 
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 3
    },
    search: {
      flexDirection: 'row',
      margin: 2
    },
    input: {
      fontSize:18, 
      width:200
    }
});