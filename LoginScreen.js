import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from'react-native-elements';

export default function LoginScreen({ onAuthenticate }) {
    return (
      <View style={styles.container}>
            <Image 
                style={styles.image}
                source={{ uri: 'https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}}
            />
            <Text style={styles.title}>Welcome to DrinkIt</Text>
            <Text style={styles.text}>DrinkIt helps you find the drink recipes you want and there you can save your own drink recipes. Click yourself in!</Text>
            <Button 
                raised icon={{name: 'login', color: 'white'}}
                buttonStyle={{ width: 100, backgroundColor: '#265F54' }}
                onPress={onAuthenticate} 
                title='Login'
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
        paddingBottom: 10,
        paddingTop: 30
    },
    image: {
        width: 266,
        height: 360,
        margin: 30
    },
    title: {
        fontSize: 24, 
        fontWeight: "bold",
    },
    text: {
        fontSize: 18,
        textAlignments: 'center',
        margin: 30
    },
});