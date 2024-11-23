import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Weather = ({ weatherData, unit }) => {
    const { main, weather, name } = weatherData;

    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'clear':
                return 'weather-sunny';
            case 'rain':
                return 'weather-rainy';
            case 'clouds':
                return 'weather-cloudy';
            default:
                return 'weather-partly-cloudy';
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.city}>{name}</Text>
            <MaterialCommunityIcons
                name={getWeatherIcon(weather[0].main)}
                size={80}
                color="#555"
            />
            <Text style={styles.temp}>
                {Math.round(main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </Text>
            <Text style={styles.description}>{weather[0].description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 16,
        backgroundColor: '#ffffffcc',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    city: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    temp: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#555',
    },
});

export default Weather;
