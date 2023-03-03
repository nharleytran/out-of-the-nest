import { Card, Text } from '@mantine/core';
import { Link } from "react-router-dom";
import '../App.css';
import * as API from '../api'
import { useEffect } from 'react';
import { useState } from 'react';

function Posts() {
  // Assuming you have an array of post objects with a title and description property

  const [posts, setPosts] = useState([]);

  API.getAllCategories().then(data => API.getPostsByCategory(data[1]._id).then(data2 => setPosts(data2)));

  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <Link to={`/feed/post`} key={index} state={{ from: post._id }}>
          <Card className="post-box" shadow="sm">
            <div className="post-content">
              <Text size="xl" weight={700} className="post-title">
                {post.title}
              </Text>
              <Text size="md" className="post-description">
                {post.author}
              </Text>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default Posts;