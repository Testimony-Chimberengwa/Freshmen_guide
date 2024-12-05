import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

const MentorshipPage = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', image: null });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentorships');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching mentorship posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);

    try {
      await fetch('http://localhost:5000/api/mentorships', {
        method: 'POST',
        body: formData,
      });
      setForm({ title: '', description: '', image: null });
      const response = await fetch('http://localhost:5000/api/mentorships');
      setPosts(await response.json());
    } catch (error) {
      console.error('Error creating mentorship post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:5000/api/mentorships/${postId}`, {
        method: 'DELETE',
      });
      const response = await fetch('http://localhost:5000/api/mentorships');
      setPosts(await response.json());
    } catch (error) {
      console.error('Error deleting mentorship post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mentorship Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />
      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => console.log('Open image picker (implement separately)')}
      >
        <Text style={styles.imageButtonText}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: `http://localhost:5000${item.imagePath}` }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
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
  imageButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default MentorshipPage;
