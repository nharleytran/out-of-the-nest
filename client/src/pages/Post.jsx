import Header from '../components/Header';
import { Container, Divider, Button, Text } from '@mantine/core';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import * as API from '../api'
import { useNavigate } from 'react-router-dom';

function Post() {
  const navigate = useNavigate();

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [score, setScore] = useState("");
  const [gpa, setGpa] = useState("");
  const [outcome, setOutcome] = useState("");
  const [date, setDate] = useState("");
  const [id, setID] = useState("");
  const [resume, setResume] = useState("");
  const [extra, setExtra] = useState("");

  const location = useLocation();
  const { from } = location.state;

  API.getPost(from).then(data => {
    setAuthor(data.author);
    setContent(data.content);
    setTitle(data.title);
    setScore(data.testscore);
    setGpa(data.gpa);
    setOutcome(data.outcome);
    setDate(data.date);
    setID(data._id);
    setResume(data.resume);
    setExtra(data.extracurriculars);
  })


  const deleteHandle = (event) => {
    event.preventDefault();
    API.deletePost(id).then(navigate("/"));
  };

    return (
        <div>
        <Header/>
        <Divider my="sm" />
        <h2 align="center">{title}</h2>
        <Container>
          <Text fz="md">Author: {author}</Text>
          <Text fz="md">Date: {date}</Text>
          <Text fz="md">Outcome: {outcome}</Text>
          <Text fz="md">GPA: {gpa}</Text>
          <Text fz="md">Test Score: {score}</Text>
          <Text fz="md">Content: {content}</Text>
          <Text fz="md">Resume Link:</Text> 
          <Text fz="md" color="blue">{resume}</Text>
          <Text fz="md">Extracurriculars: {extra}</Text>
        </Container>
        <Divider my="sm" />
        <Link to={`/edit`} state={{ from: id }}>
          <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Edit draft</Button>
        </Link>
        <Link to={`/feed`}>
          <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} onClick={deleteHandle}>DeletePost</Button>
        </Link>
        </div>

    )
}

export default Post;