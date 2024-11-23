import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';

const HourlyForecast = ({ forecastData }) => {
    const renderItem = ({ item }) => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

        return (
            <View style={styles.card}>
                <Text style={styles.time}>{time}</Text>
                <Image source={{ uri: icon }} style={styles.icon} />
                <Text style={styles.temp}>{Math.round(item.main.temp)}°</Text>
            </View>
        );
    };

    return (
        <View>
            <Text style={styles.title}>Hourly Forecast</Text>
            <FlatList
                data={forecastData}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    title: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '10@ms',
    },
    list: {
        paddingHorizontal: '10@ms',
    },
    card: {
        alignItems: 'center',
        marginHorizontal: '8@ms',
        backgroundColor: '#ffffff22',
        padding: '10@ms',
        borderRadius: '10@ms',
    },
    time: {
        color: '#fff',
        fontSize: RFValue(14),
    },
    icon: {
        width: '40@ms',
        height: '40@ms',
    },
    temp: {
        color: '#fff',
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
});

export default HourlyForecast;
