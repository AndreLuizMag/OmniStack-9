import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, AsyncStorage, Image, StyleSheet, ScrollView } from 'react-native';

import SpotList from '../components/SpotList';

import Logo from '../assets/logo.png'

export default function List({navigation}) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    function backStart(){
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={StyleSheet.container}>
            <Image source={Logo} onPress={backStart} style={styles.logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>

            <TouchableOpacity onPress={backStart} style={styles.button}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 50
    },
    button: {
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },


});