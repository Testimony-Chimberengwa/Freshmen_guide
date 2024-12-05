
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events'); // Backend endpoint
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../assets/landing-bg.jpg')}
        style={styles.backgroundImage}
      />

      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>Freshman Guide</Text>
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Help')}
          >
            <Text style={styles.navButtonText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.navButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.navButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Freshman Guide</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar of Events */}
      <ScrollView style={styles.calendarScrollView}>
        <Text style={styles.calendarTitle}>Calendar of Events</Text>
        <FlatList
          data={events}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.eventName}>{item.eventName}</Text>
              <Text style={styles.eventDetails}>{new Date(item.date).toLocaleDateString()}</Text>
              <Text style={styles.eventDetails}>{item.location}</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  logo: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  navButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  navButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarScrollView: {
    flex: 1, // Makes the ScrollView scrollable
    padding: 16,
    backgroundColor: '#ffffff',
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  eventCard: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555555',
  },
  eventDetails: {
    fontSize: 14,
    color: '#777777',
  },
});

export default LandingPage;
