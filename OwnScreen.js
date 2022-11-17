import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View, Keyboard, TextInput } from 'react-native';
import { Button, Input, ListItem } from'react-native-elements';
import * as SQLite from'expo-sqlite';

const db = SQLite.openDatabase('drinksdb.db');

export default function OwnScreen({ navigation }) {
  const [name, setName] = useState(''); 
  const [ingredient, setIngredient] = useState(''); //TAULUKOKSI
  const [instruction, setInstruction] = useState('');
  const [drinks, setDrinks] = useState([]);
  //KUVA

  useEffect(() => {  
    db.transaction(tx => {    
      tx.executeSql('create table if not exists drinklist(id integer primary key not null, name text, ingredient text, instruction text);');  
    }, null, updateList);
  }, []);

  const saveItem = () => {  
    db.transaction(tx => {    
      tx.executeSql('insert into drinklist (name, ingredient, instruction) values (?, ?, ?);',  
        [name, ingredient, instruction]);    
    }, null, updateList)
    setName('');
    setIngredient(''); 
    setInstruction('');
    //KUVA
  }


  const updateList = () => {  
    db.transaction(tx => {    
      tx.executeSql('select * from drinklist;', [], (_, { rows }) =>      
        setDrinks(rows._array) 
      );   
    }, null, null);
    Keyboard.dismiss(); 
    console.log(drinks) 
  }

  const deleteItem = (id) => {  
    db.transaction(tx => {
      tx.executeSql('delete from drinklist where id = ?;', [id]);
    }, null, updateList) }

  const triggerAlert = (id) => {
    Alert.alert(
      "Do you want delete this drink?",
      "",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => deleteItem(id)
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder='name'
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input} 
        placeholder='ingredient'
        onChangeText={text => setIngredient(text)}
        value={ingredient}
      />
      <TextInput
        style={styles.input} 
        placeholder='instruction'
        onChangeText={text => setInstruction(text)}
        value={instruction}
      />
      <Button
        raised icon={{name: 'add', color: 'white'}}
        buttonStyle={{ width: 130, backgroundColor: '#265F54' }}
        title="Add drink"
        onPress={saveItem} 
      />
      <FlatList
        style={{padding: 0, width:"100%"}}
        ListEmptyComponent={<Text style={{alignItems: 'center',}}>Start adding a drink.</Text>}
        data={drinks}
        keyExtractor={(item,index) => index.toString()}  
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            onPress={() => navigation.navigate('DrinkOfOwn', { item })}
            onLongPress={() => triggerAlert(item.id)} 
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
              {/* <View>
                <Image source={{ uri: item.strDrinkThumb}} style={styles.image}/>
              </View> */}
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
        paddingBottom: 3
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