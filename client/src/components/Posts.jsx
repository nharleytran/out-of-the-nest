import { Card, Text, Grid, Badge } from '@mantine/core';
import { Link } from "react-router-dom";
import '../App.css';
import * as postApi from "../api"; 
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';



function Posts(props) {
  // Assuming you have an array of post objects with a title and description property
  // console.log(props.category_id)

  // console.log(postApi.getPostsByCategory(props.category_id))
    const [posts,setPosts] = useState([]);
    const { query } = props;
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
          <Link to={`/feed/post`} key={index} state={{ from: post._id }}>
            <Card className="post-box" shadow="sm">
              <div className="post-content">
                <Text size="xl" weight={700} className="post-title">
                  {post.title}
                </Text>
                <Text size="md" className="post-description">
                  {post.description}
                  <Grid>
                    <Grid.Col span="content"><Badge className=".post-smallbox" color= "blue">GPA:{post.gpa}</Badge></Grid.Col>
                    <Grid.Col span="content"><Badge className=".post-smallbox" color= "blue">Program:{post.testscore}</Badge></Grid.Col>
                    <Grid.Col span="content"><Badge className=".post-smallbox" color= "blue">Result:{post.outcome}</Badge></Grid.Col>
                    <Grid.Col span="content"><Badge className=".post-smallbox" color= "blue">Date:{post.date}</Badge></Grid.Col>
                  </Grid>
                </Text>
              </div>
            </Card>
          </Link>
        ))}
    </div>
  );
}

export default Posts;