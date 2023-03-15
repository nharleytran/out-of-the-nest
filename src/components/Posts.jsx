import { Card, Text, Grid, Badge, Container, Group } from '@mantine/core';
import { Link } from "react-router-dom";
import '../App.css';
import * as postApi from "../api"; 
import React, { useState, useEffect } from 'react';

function Posts(props) {
    const { query, posts, setPosts } = props;
    useEffect(() => {
      postApi.getPostsByCategory(props.category_id).then((posts) => setPosts(posts))
      }, []);
    if (!posts) {
      return null;
    }

  return (
    <div className="posts-container">
         {posts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(query.trim().toLowerCase()) ||
            post.content.toLowerCase().includes(query.trim().toLowerCase())
        ).map((post, index) => (
        <Link to={`/feed/post`} key={index} state={{ from: post._id }} style={{ textDecoration: 'none' }}>
          <Card className="post-box" shadow="sm" radius="md" withBorder style={{ zIndex: -99 }}>
            <div className="post-content">
              <Text size="xl" weight={700}>
                {post.title}
              </Text>
              <Text size="md">
                {post.description}
              </Text>
              <Group mt="md" mb="xs">
                <Badge color="pink" variant="light">
                  {post.outcome}
                </Badge>
                <Badge color="gray" variant="light">
                  GPA {post.gpa}
                </Badge>
                <Badge color="gray" variant="light">
                  Test Score {post.testscore}
                </Badge>
                <Badge color="gray" variant="light">
                  {post.date}
                </Badge>
              </Group>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default Posts;