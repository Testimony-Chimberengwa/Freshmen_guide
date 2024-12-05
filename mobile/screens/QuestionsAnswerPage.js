import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const QuestionsAnswerPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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

  const handleAnswerSubmit = async () => {
    try {
      await fetch(`http://localhost:5000/api/questions/${selectedQuestion._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      });
      setAnswer('');
      setSelectedQuestion(null);
      const response = await fetch('http://localhost:5000/api/questions');
      setQuestions(await response.json());
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Answer Questions</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => setSelectedQuestion(item)}>
            <Text style={styles.question}>{item.question}</Text>
            {item.answer && <Text style={styles.answer}>A: {item.answer}</Text>}
          </TouchableOpacity>
        )}
      />
      {selectedQuestion && (
        <View style={styles.answerForm}>
          <Text style={styles.selectedQuestion}>Q: {selectedQuestion.question}</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your answer here..."
            value={answer}
            onChangeText={setAnswer}
          />
          <TouchableOpacity style={styles.button} onPress={handleAnswerSubmit}>
            <Text style={styles.buttonText}>Submit Answer</Text>
          </TouchableOpacity>
        </View>
      )}
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
  answerForm: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    elevation: 2,
  },
  selectedQuestion: {
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default QuestionsAnswerPage;
