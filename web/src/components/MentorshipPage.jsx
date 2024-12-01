import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../styles/MentorshipPage.css';

const MentorshipPage = () => {
  const { user } = useAuth(); // Access the current user
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', image: null });
  const [expandedPost, setExpandedPost] = useState(null);
  const [editPost, setEditPost] = useState(null); // To manage the post being edited
  const [editForm, setEditForm] = useState({}); // To manage the edit form
  const navigate = useNavigate();

  // Fetch posts from the backend for the current user
  const fetchPosts = async () => {
    const response = await fetch(`http://localhost:5000/api/mentorships?author=${user.username}`);
    const data = await response.json();
    setPosts(data);
  };

  // Submit new mentorship post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('image', form.image);
    formData.append('author', user.username);

    await fetch('http://localhost:5000/api/mentorships', {
      method: 'POST',
      body: formData,
    });

    fetchPosts();
    setForm({ title: '', description: '', image: null });
  };

  // Handle deleting a mentorship post
  const handleDelete = async (postId) => {
    await fetch(`http://localhost:5000/api/mentorships/${postId}`, {
      method: 'DELETE',
    });
    fetchPosts();
  };

  // Open the edit form with the selected post's data
  const handleEdit = (post) => {
    setEditPost(post._id); // Track which post is being edited
    setEditForm({ title: post.title, description: post.description, image: null });
  };

  // Save the edited post
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', editForm.title);
    formData.append('description', editForm.description);
    if (editForm.image) formData.append('image', editForm.image);

    await fetch(`http://localhost:5000/api/mentorships/${editPost}`, {
      method: 'PUT',
      body: formData,
    });

    setEditPost(null); // Close the edit form
    fetchPosts(); // Refresh the posts
  };

  // Expand the card to show full details
  const toggleExpand = (postId) => {
    setExpandedPost((prev) => (prev === postId ? null : postId));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="mentorship-page">
      <h1>Mentorship</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          required
        />
        <button type="submit">Post</button>
      </form>

      <div className="post-list">
        {posts.map((post) => (
          <div
            className={`post-card ${expandedPost === post._id ? 'expanded' : ''}`}
            key={post._id}
            onClick={() => toggleExpand(post._id)}
          >
            <img src={`http://localhost:5000${post.imagePath}`} alt={post.title} />
            <h3>{post.title}</h3>
            {expandedPost === post._id && (
              <div className="post-details">
                <p><strong>Author:</strong> {post.author || 'Unknown'}</p>
                <p><strong>Date:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(post.createdAt).toLocaleTimeString()}</p>
                <p>{post.description}</p>
                <div className="post-actions">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(post); }}>
                    Edit
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(post._id); }}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {editPost && (
        <div className="edit-form">
          <form onSubmit={handleEditSubmit}>
            <h2>Edit Post</h2>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              required
            />
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              required
            />
            <input
              type="file"
              onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}
            />
            <button type="submit" className="save-btn">Save</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditPost(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate('/dashboard/alumni')}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default MentorshipPage;
