import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, AsyncStorage, SafeAreaView, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicidação de reserva enviada.');

        navigation.navigate('List');

    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Data de Interesse</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data deseja reservar?"
                placeholderTextColor="#999"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Soliciar Reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancel]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        margin: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginLeft: 18,
        marginTop: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 20,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },

    cancel: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },


});