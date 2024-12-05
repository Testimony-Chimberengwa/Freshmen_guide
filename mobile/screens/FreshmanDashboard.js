


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FreshmanDashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Freshman!</Text>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MentorshipAdvice')}>
        <Text style={styles.cardTitle}>Mentorship Advice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('QuestionsPage')}>
        <Text style={styles.cardTitle}>Questions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FAQPage')}>
        <Text style={styles.cardTitle}>FAQs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FreshmanDashboard;

