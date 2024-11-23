import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Image, Animated, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScaledSheet } from 'react-native-size-matters';
import axios from 'axios';
import * as Location from 'expo-location';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [fadeAnim] = useState(new Animated.Value(0));

  const API_KEY = 'd5e8c8bf9e4648ecc1e571155df0e31a';

  // Fetch Weather by City
  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      setForecast(forecastResponse.data.list.slice(0, 24));
    } catch (error) {
      alert('City not found!');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };


  const fetchWeatherByLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`
      );
      setForecast(forecastResponse.data.list.slice(0, 24));
    } catch (error) {
      alert('Unable to fetch weather data!');
    } finally {
      setLoading(false);
    }
  };


  const getGradientColors = () => {
    if (!weather) return ['#4c6ef5', '#1e3c72'];
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes('rain')) return ['#4f6d7a', '#c4e0e5'];
    if (condition.includes('clear')) return ['#fceabb', '#f8b500'];
    if (condition.includes('clouds')) return ['#bdc3c7', '#2c3e50'];
    return ['#4c6ef5', '#1e3c72'];
  };


  useEffect(() => {
    if (weather) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [weather]);

  return (
    <LinearGradient colors={getGradientColors()} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          { }
          <Text style={styles.title}>Weather App</Text>

          { }
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            placeholderTextColor="#fff"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={() => fetchWeather(city)}
          />

          { }
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => fetchWeather(city)}>
              <Text style={styles.buttonText}>Get Weather</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={fetchWeatherByLocation}>
              <Text style={styles.buttonText}>Use Current Location</Text>
            </TouchableOpacity>
          </View>

          { }
          {loading && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}

          { }
          {weather && (
            <Animated.View style={[styles.weatherContainer, { opacity: fadeAnim }]}>
              <Text style={styles.cityName}>{weather.name}</Text>
              <Text style={styles.temperature}>
                {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
              </Text>
              <Text style={styles.weatherDescription}>{weather.weather[0].description}</Text>
              <Image
                source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                style={styles.weatherIcon}
              />
            </Animated.View>
          )}

          { }
          {forecast && <HourlyForecast forecastData={forecast} />}
          {weeklyData && <WeeklyForecast weeklyData={weeklyData} />}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '20@ms',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    marginTop: '40@ms',
  },
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: '40@ms',
  },
  title: {
    fontSize: RFValue(36),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: '16@ms',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontFamily: 'Roboto',
  },
  input: {
    height: '50@ms',
    width: '90%',
    backgroundColor: '#ffffff22',
    borderRadius: '25@ms',
    paddingHorizontal: '16@ms',
    color: '#fff',
    fontSize: RFValue(16),
    marginBottom: '20@ms',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: '12@ms',
    paddingHorizontal: '24@ms',
    borderRadius: '30@ms',
    marginVertical: '8@ms',
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFValue(18),
    fontFamily: 'Roboto',
  },
  loader: {
    marginVertical: '20@ms',
  },
  weatherContainer: {
    marginVertical: '20@ms',
    alignItems: 'center',
    padding: '20@ms',
    backgroundColor: '#ffffff30',
    borderRadius: '15@ms',
    width: '90%',
    alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
  cityName: {
    color: '#fff',
    fontSize: RFValue(26),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  temperature: {
    color: '#fff',
    fontSize: RFValue(50),
    fontWeight: 'bold',
    marginVertical: '10@ms',
  },
  weatherDescription: {
    color: '#fff',
    fontSize: RFValue(18),
    textAlign: 'center',
  },
  weatherIcon: {
    width: '120@ms',
    height: '120@ms',
    marginTop: '20@ms',
  },
});

export default App;
