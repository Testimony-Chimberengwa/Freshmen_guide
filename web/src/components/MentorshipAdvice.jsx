import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Typed from "typed.js";
import StarRating from "../components/StarRating"; // Import the StarRating component
import "../styles/MentorshipAdvice.css";

const MentorshipAdvice = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/mentorships");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const typed = new Typed(".typewriter", {
      strings: ["Mentorship Advice"],
      typeSpeed: 50,
      loop: false,
    });
    return () => typed.destroy();
  }, []);

  const handleRatingChange = async (postId, newRating) => {
    try {
      const response = await fetch("http://localhost:5000/api/mentorships/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, rating: newRating }),
      });
      const updatedRatings = await response.json();

      // Update the posts list with the new average rating
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, ratings: updatedRatings }
            : post
        )
      );
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className={`mentorship-advice ${expandedPost ? "blurred" : ""}`}>
      <h1 className="typewriter"></h1>
      <div className="advice-list">
        {posts.map((post) => (
          <div
            className="advice-card"
            key={post._id}
            onClick={() => setExpandedPost(post)}
          >
            {/* Display the average rating */}
            <StarRating value={post.ratings?.average || 0} readonly />
            <img
              src={`http://localhost:5000${post.imagePath}`}
              alt={post.title}
              className="advice-image"
            />
            <h3>{post.title}</h3>
          </div>
        ))}
      </div>

      {expandedPost && (
        <div className="expanded-card">
          <button className="close-btn" onClick={() => setExpandedPost(null)}>
            &times;
          </button>
          <img
            src={`http://localhost:5000${expandedPost.imagePath}`}
            alt={expandedPost.title}
            className="expanded-image"
          />
          <h3>{expandedPost.title}</h3>
          <p>
            <strong>Author:</strong> {expandedPost.author}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(expandedPost.createdAt).toLocaleString()}
          </p>
          <p>{expandedPost.description}</p>

          {/* Allow freshmen to rate */}
          <h4>Rate this advice:</h4>
          <StarRating
            value={0}
            onChange={(rating) => handleRatingChange(expandedPost._id, rating)}
          />
          <p>
            Average Rating: {expandedPost.ratings?.average.toFixed(1) || "0.0"}
          </p>
        </div>
      )}

      <button
        className="back-btn"
        onClick={() => navigate("/dashboard/freshman")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default MentorshipAdvice;
