import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function DrinkOfOwnScreen({ route }) {
  const { item } = route.params;
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setIngredients(getIngredients());
  }, []);

  const getIngredients = () => {
    let x = [];
    x = item.ingredient.split(';');
    return x;   
  }

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/jpg;base64,${item.imageBase64}`}} 
        />
        <Text style={styles.title}>{item.name}</Text>
        <FlatList style={styles.list}
          data={ingredients}
          renderItem={({item}) => <Text>{item}</Text>}  
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.text}>{item.instruction}</Text>
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
        paddingTop: 30,
        paddingBottom: 100
    },
    title: {
      fontSize: 18, 
      fontWeight: "bold",
    },
    text: {
      fontSize: 14,
      textAlignments: 'center',
    },
    image: {
      width: 180,
      height: 230,
      margin: 20
    },
    list: {
      margin: 10,
    }
});