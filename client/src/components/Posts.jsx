import { Card, Text } from '@mantine/core';
import { Link } from "react-router-dom";
import '../App.css';

function Posts() {
  // Assuming you have an array of post objects with a title and description property
  const posts = [
    { title: "Post 1", description: "This is post 1 description" },
    { title: "Post 2", description: "This is post 2 description" },
    { title: "Post 3", description: "This is post 3 description" }
  ];

  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <Link to={`/feed/post${index}`} key={index}>
          <Card className="post-box" shadow="sm">
            <div className="post-content">
              <Text size="xl" weight={700} className="post-title">
                {post.title}
              </Text>
              <Text size="md" className="post-description">
                {post.description}
              </Text>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default Posts;