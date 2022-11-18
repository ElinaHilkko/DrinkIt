import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from'react-native-elements';

export default function RandomScreen() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState('');

  useEffect(() => {
    getCocktail();
  }, []);

  const getCocktail = async () => {
    ingredients.splice(0);
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        setName(data.drinks[0].strDrink);
        setImage(data.drinks[0].strDrinkThumb);
        setInstruction(data.drinks[0].strInstructions);

        let newStateArray = [];
        for (let i = 0; i < 15; i++) {
          let x = "strIngredient" + (i+1).toString();
          let y = "strMeasure" + (i+1).toString();
          if (data.drinks[0][x] != null) {
            newStateArray.push({ingredient: data.drinks[0][x], amount: data.drinks[0][y]});
          }
          else {
            break;
          }
        };
        setIngredients(newStateArray);
    } catch (error) {
       Alert.alert('Error', error);
    };
  }

    return (
      <View style={styles.container}>
        <Button
          raised icon={{name: 'casino', color: 'white'}}
          buttonStyle={{ width: 250, backgroundColor: '#265F54' }}
          onPress={getCocktail} 
          title="Get a random drink" 
        />
        <Image 
          style={styles.image}
          source={{ uri: `${image}`, }}
        />
        <Text style={styles.title}>{name}</Text>
        <FlatList style={styles.list}
          data={ingredients}
          renderItem={({item}) => <Text>{item.ingredient} {item.amount}</Text>}  
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.text}>{instruction}</Text>
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
        paddingBottom: 70
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