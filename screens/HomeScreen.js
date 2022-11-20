import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from'react-native-elements';

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{ uri: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'}}
            />
            <Button 
                raised icon={{name: 'search', color: 'white'}}
                buttonStyle={{ width: 150, backgroundColor: '#265F54' }}
                onPress={() => navigation.navigate('Search')} 
                title="Search drink" 
            />
            <Text/>
            <Button 
                raised icon={{name: 'casino', color: 'white'}}
                buttonStyle={{ width: 150, backgroundColor: '#265F54' }}
                onPress={() => navigation.navigate('Random')} 
                title="Random drink" 
            />
            <Text/>
            <Button 
                raised icon={{name: 'grade', color: 'white'}}
                buttonStyle={{ width: 150, backgroundColor: '#265F54' }}
                onPress={() => navigation.navigate('Own')} 
                title="Own drinks" 
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
        paddingBottom: 30
    },
    button: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        margin: 5,
    },
    image: {
        width: 266,
        height: 360,
        margin: 20
    },
});