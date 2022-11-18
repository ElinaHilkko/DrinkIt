import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import { Button, ListItem } from'react-native-elements';

export default function SearchScreen({ navigation }) {
  const [name, setName] = useState(''); 
  const [ingredient, setIngredient] = useState('');
  const [drinks, setDrinks] = useState([]);

  const findByName = async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDrinks(data.drinks);
    } catch (error) {
      Alert.alert('Error', error);
    };
    Keyboard.dismiss();
    setName('');
  }
 
  const findByIngredient = async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDrinks(data.drinks);
    } catch (error) {
      Alert.alert('Error', error);
    };
    Keyboard.dismiss();
    setIngredient('');
  }

    return (
      <View style={styles.container}>
        <FlatList
          style={{padding: 0, width:"100%"}}
          ListEmptyComponent={<Text style={{ fontSize: 18}}>Start your search by searching by name or ingredient.</Text>} 
          data={drinks}
          keyExtractor={(item,index) => index.toString()}  
          renderItem={({ item }) => (
            <ListItem
              bottomDivider
              onPress={() => navigation.navigate('DrinkOfSearch', { item })}
            >
              <ListItem.Content>
                <ListItem.Title style={styles.title}>{item.strDrink}</ListItem.Title>
                <View>
                  <Image source={{ uri: item.strDrinkThumb}} style={styles.image}/>
                </View>
              </ListItem.Content>
              <Text style={{color: 'grey'}}>See details</Text>
              <ListItem.Chevron />
            </ListItem>)
          }  
        />
        <View style={styles.search}>
          <TextInput 
            style={styles.input} 
            placeholder='name'
            onChangeText={text => setName(text)} 
            value={name}
          />
          <Button 
            buttonStyle={{ width: 150, backgroundColor: '#265F54' }}
            title="Find by name"
            onPress={findByName} 
          />
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.input} 
            placeholder='ingredient'
            onChangeText={text => setIngredient(text)}
            value={ingredient} 
          />
          <Button 
            buttonStyle={{ width: 150, backgroundColor: '#265F54' }}
            title="Find by ingredient" 
            onPress={findByIngredient} 
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
        paddingTop: 5,
        paddingBottom: 5
    },
    search: {
      flexDirection: 'row',
      margin: 2
    },
    input: {
      fontSize:18, 
      width:200
    },
    title: {
      fontSize: 18, 
      fontWeight: "bold",
    },
    image: {
      width: 66,
      height: 58,
    },
  });