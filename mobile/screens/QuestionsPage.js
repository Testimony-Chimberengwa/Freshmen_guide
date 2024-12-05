import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const submitQuestion = async () => {
    try {
      await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newQuestion }),
      });
      setNewQuestion('');
      const updatedQuestions = await fetch('http://localhost:5000/api/questions');
      setQuestions(await updatedQuestions.json());
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ask a Question</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your question here..."
        value={newQuestion}
        onChangeText={setNewQuestion}
      />
      <TouchableOpacity style={styles.button} onPress={submitQuestion}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <FlatList
        data={questions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.question}>{item.question}</Text>
            {item.answer && <Text style={styles.answer}>A: {item.answer}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  question: {
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 5,
  },
});

export default QuestionsPage;
