import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View, Keyboard } from 'react-native';
import { Button } from'react-native-elements';

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
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
        margin: 5
    },
    button: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        margin: 5,
    }
});