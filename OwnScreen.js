import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View, Keyboard, TextInput } from 'react-native';
import { Button, Input, ListItem } from'react-native-elements';
import * as SQLite from'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';

const db = SQLite.openDatabase('drinksdb.db');

export default function OwnScreen({ navigation }) {
  const [name, setName] = useState(''); 
  const [ingredient, setIngredient] = useState(''); //TAULUKOKSI
  const [instruction, setInstruction] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  useEffect(() => {
    //dropTable();  
    db.transaction(tx => {    
      tx.executeSql('create table if not exists drinklist(id integer primary key not null, name text, ingredient text, instruction text, imageBase64 text);');  
    }, null, updateList);
  }, []);

  const saveItem = () => {  
    db.transaction(tx => {    
      tx.executeSql('insert into drinklist (name, ingredient, instruction, imageBase64) values (?, ?, ?, ?);',  
        [name, ingredient, instruction, imageBase64]);    
    }, null, updateList)
    setName('');
    setIngredient(''); 
    setInstruction('');
    setImage(null);
  }

  const dropTable = () =>{
    db.transaction(tx => {    
      tx.executeSql('drop table drinklist;',);    
    }, null, updateList)
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [3, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setImageBase64(result.base64);
    }
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
        raised icon={{name: 'image', color: 'white'}}
        title='Pick an image from camera roll' onPress={pickImage}
        buttonStyle={{backgroundColor: '#A7A6A6' }}
      />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Text></Text>
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
              <View>
                <Image source={{ uri: `data:image/jpg;base64,${item.imageBase64}`}} style={styles.image}/>
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