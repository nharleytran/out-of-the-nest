import Header from "../components/Header";
import {
  Container,
  Blockquote,
  Button,
  MantineProvider,
  Title,
  Group,
  Badge,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import * as API from "../api";
import { useNavigate } from "react-router-dom";

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

  API.getPost(from).then((data) => {
    setExtra(data.extracurriculars[0]);
    setAuthor(data.author);
    setContent(data.content);
    setTitle(data.title);
    setScore(data.testscore);
    setGpa(data.gpa);
    setOutcome(data.outcome);
    setDate(data.date);
    setID(data._id);
    setResume(data.resume);
  });

  const deleteHandle = (event) => {
    event.preventDefault();
    API.deletePost(id).then(navigate("/"));
  };

  return (
    <div>
      <Header />
      <Container className="post-page-detail">
        <Title size="h2" color={"blue"}>
          {title}
        </Title>
        <Group position="apart">
          <Badge color="pink" variant="light">
            {outcome}
          </Badge>
          <Badge color="gray" variant="light">
            GPA {gpa}
          </Badge>
          <Badge color="gray" variant="light">
            Test Score {score}
          </Badge>
          <Badge color="gray" variant="light">
            {date}
          </Badge>
          <Badge color="blue" variant="light">
            <a href={resume}>Resume Link</a>
          </Badge>
          <Link to={`/edit`} state={{ from: id }}>
            <Button color="yellow">Edit draft</Button>
          </Link>
          <Link to={`/feed`}>
            <Button color="red" onClick={deleteHandle}>
              DeletePost
            </Button>
          </Link>
        </Group>
        <MantineProvider
          theme={{
            fontFamily: "Verdana, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            headings: { fontFamily: "Greycliff CF, sans-serif" },
          }}
        >
          <Blockquote cite={`— Author: ${author}`}>{content}</Blockquote>
        </MantineProvider>
        <Group mt="md" mb="xs">
          {extra.split(",").map((activity, index) => (
            <Badge color="green" key={index}>
              {activity}
            </Badge>
          ))}
        </Group>
      </Container>
    </div>
  );
}

export default Post;
