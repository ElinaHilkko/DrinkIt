import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import { Button, ListItem } from'react-native-elements';

export default function SearchScreen({ navigation }) {
  const [text, setText] = useState(''); 
  const [drinks, setDrinks] = useState([]);

  const findByName = async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDrinks(data.drinks);
    } catch (error) {
      Alert.alert('Error', error);
    };
    Keyboard.dismiss();
    setText('');
  }
 
  const findByIngredient = async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDrinks(data.drinks);
    } catch (error) {
      Alert.alert('Error', error);
    };
    Keyboard.dismiss();
    setText('');
  }

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input} 
          placeholder='write name or ingredient'
          onChangeText={text => setText(text)} 
          value={text}
        />
        <View style={styles.search}>
          <Button
            raised icon={{name: 'search', color: 'white'}} 
            buttonStyle={{ width: 140, backgroundColor: '#265F54' }}
            title="Find by name"
            onPress={findByName} 
          />
          <Text>    </Text>
          <Button
            raised icon={{name: 'search', color: 'white'}} 
            buttonStyle={{ width: 180, backgroundColor: '#265F54' }}
            title="Find by ingredient" 
            onPress={findByIngredient} 
          />
        </View>
        <FlatList
          style={styles.list}
          ListEmptyComponent={<Text style={styles.emptyList}>Start your search by searching by name or ingredient.</Text>} 
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
        paddingBottom: 5
    },
    search: {
      flexDirection: 'row',
    },
    input: {
      fontSize:18, 
      width:'90%',
      margin: 10
    },
    title: {
      fontSize: 18, 
      fontWeight: "bold",
    },
    image: {
      width: 66,
      height: 58,
    },
    list: {
      padding: 0, 
      width:"100%", 
      margin: 10
    },
    emptyList: {
      alignItems: 'center', 
      fontSize: 18
    }
  });