import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View, Keyboard } from 'react-native';
import { Button, Input, ListItem } from'react-native-elements';

export default function DrinkOfOwnScreen({ route }) {
  const { item } = route.params;
  const { ingredients, setIngredients } = useState([]);

  //SPLIT AINEKSET

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/jpg;base64,${item.imageBase64}`}} 
        />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>{item.ingredient}</Text>
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
    },
    title: {
      fontSize: 18, 
      fontWeight: "bold",
    },
    text: {
      fontSize: 14,
      textAlignments: 'center',
      textAlignmentsVertical: 'top'
    },
    image: {
      width: 166,
      height: 158,
      margin: 20
    },
    list: {
      margin: 10,
    }
});