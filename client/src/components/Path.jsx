import React, { useState, useEffect } from 'react';
import { Card, Text, Button } from '@mantine/core';
import '../App.css';
import { Link } from "react-router-dom";

function Path() {
  // const [paths,setPaths] = useState([]);

  // useEffect(() => {
  //   pathApi.getAllPaths()
  //     .then((paths) => setPaths(paths))
  // }, []);

  // if (!paths) {
  //   return null;
  // }
  

  return (
    <div className = "paths-container">
      <Link to={`/feed`}>
        <Button className="path-box" shadow="sm">
          <div className="path-content">
            <Text size="xl" weight={700} className="path-title">
              Medical Schools
            </Text>
          </div>
          </Button>
      </Link>
      <Link to={`/feed`}>
        <Button className="path-box" shadow="sm">
          <div className="path-content">
            <Text size="xl" weight={700} className="path-title">
              Medical Schools
            </Text>
          </div>
          </Button>
      </Link>
      <Link to={`/feed`}>
        <Button className="path-box" shadow="sm">
          <div className="path-content">
            <Text size="xl" weight={700} className="path-title">
              Medical Schools
            </Text>
          </div>
          </Button>
      </Link>
      <Link to={`/feed`}>
        <Button className="path-box" shadow="sm">
          <div className="path-content">
            <Text size="xl" weight={700} className="path-title">
              Medical Schools
            </Text>
          </div>
          </Button>
      </Link>
      <Link to={`/feed`}>
        <Button className="path-box" shadow="sm">
          <div className="path-content">
            <Text size="xl" weight={700} className="path-title">
              Medical Schools
            </Text>
          </div>
          </Button>
      </Link>
    </div>
  );
}

export default Path;
