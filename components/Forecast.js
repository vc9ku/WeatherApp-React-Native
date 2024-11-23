import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Forecast = ({ forecastData }) => {
    return (
        <FlatList
            data={forecastData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.date}>{new Date(item.dt_txt).toLocaleString()}</Text>
                    <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
                    <Text style={styles.description}>{item.weather[0].description}</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#ffffffcc',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    date: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    temp: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default Forecast;
