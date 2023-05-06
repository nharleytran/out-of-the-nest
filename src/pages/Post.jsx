import Header from "../components/Header";
import LikeDislike from "../components/LikeDislike.jsx";

import {
  Container,
  Blockquote,
  Button,
  MantineProvider,
  Title,
  Group,
  Badge,
  Card,
  Text,
  SimpleGrid,
  Textarea,
  Space,
  Switch,
  UnstyledButton
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import * as API from "../api";
import { getUser } from "../api/user_api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  const [editable, setEditable] = useState(false);
  const location = useLocation();
  const { from } = location.state;
  const [international, setInternational] = useState(false);
  const [postComment, setPostComment] = useState("");
  const [comments, setComments] = useState([]);

  const [likedId, setlikedId] = useState([]);
  const [postlike, setPostLike] = useState(0);
  // const [commentlike, setCommentLike] = useState(0);
  // const [commentlikedId, setcommentlikedId] = useState([]);
  // const [commentId, setCommentId] = useState("");


  // const comments = [
  //   { author: "Example Author 1", detail: "Example Content 1", endorse: true, likes: 9, dislikes: 2 },
  //   { author: "Example Author 2", detail: "Example Content 2", endorse: false, likes: 5, dislikes: 1  },
  //   { author: "Example Author 3", detail: "Example Content 3", endorse: true, likes: 12, dislikes: 0  }
  // ];


  const user_id = localStorage.getItem("user_id");


  useEffect(() => {
    API.getPost(from).then((data) => {
      setExtra(data.extracurriculars[0]);
      setAuthor(data.anonymous ? "Anonymous" : data.user_name);
      setContent(data.content);
      setTitle(data.title);
      setScore(data.testscore);
      setGpa(data.gpa);
      setOutcome(data.outcome);
      setDate(data.date);
      setID(data._id);
      setResume(data.resume);
      setEditable(data.editable);
      setInternational(data.international);
      setPostLike(data.like);
      setlikedId(data.liked_id);
      // setCommentLike(data.comments.like);
      // setcommentlikedId(data.comments.liked_id);

    });
    API.getAllComments(from).then((data) => {
      setComments(data);
    });
  });

  const deleteHandle = (event) => {
    event.preventDefault();
    API.deletePost(id).then(navigate("/"));
  };
  
  const submitComment = async (event) => {
    event.preventDefault();
    const test = await API.createComment(id, postComment).then(console.log(comments));
    if (test.status === 401){
      alert("You need to login in order to endorse");
      navigate("/login");
    }
  };

  const likePost = async (event) => {
    const test = await API.likePost(id);
    if (test.status === 401){
      alert("You need to login in order to endorse");
      navigate("/login");
    } else {
      setPostLike((prevState) => prevState + 1);
    }

  };

  const dislikePost = async (event) => {
    const test = await API.dislikePost(id);
    if (test.status === 401){
      alert("You need to login in order to endorse");
      navigate("/login");

    } else {
      setPostLike((prevState) => prevState - 1);
    }
  };

  const editBtn = !editable ? null : (
    <>
      <Link to={`/edit`} state={{ from: id }}>
        <Button color="yellow">Edit draft</Button>
      </Link>
      <Link to={`/feed`}>
        <Button color="red" onClick={deleteHandle}>
          DeletePost
        </Button>
      </Link>
    </>
  );

  return (
    <div>
      <Header />
      <Container className="post-page-detail">
        <Title size="h2" color={"blue"}>{title}</Title>
        <Group position="apart">
          <Badge color="pink" variant="light">{outcome}</Badge>
          <Badge color="gray" variant="light">GPA {gpa}</Badge>
          <Badge color="gray" variant="light">Test Score {score}</Badge>
          <Badge color="gray" variant="light">
          {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
          </Badge>
          <Badge color={international ? "blue" : "green"} variant="light">
            {international ? "International" : "Domestic"}
          </Badge>
          {editBtn}
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
            <Badge color="green" key={index}>{activity}</Badge>
          ))}
          <Badge color="blue" variant="light">
            <a href={resume}>Resume Link</a>
          </Badge>
          <LikeDislike 
              like = {postlike} 
              handleLike={likePost}
              handleDislike={dislikePost}
              likedId = {likedId}
              />
        </Group>
      </Container>
      <Container>
        <SimpleGrid cols={1} verticalSpacing="sm">
          <Card shadow="sm" radius="sm">
            <Textarea
              placeholder="Enter Your Comment Here"
              label="Post Your comment!"
              value={postComment}
              onChange={(event) => setPostComment(event.currentTarget.value)}
            />
            <Space h="sm" />
            <Group position="apart" mb="xs">
              <Button variant="light" color="blue" radius="md" onClick={submitComment}>
                Publish
              </Button>
            </Group>
          </Card>
          <Title size="h2" color={"blue"}>Comments</Title>
          {comments.map((comment, index) => (
            <Card shadow="sm" radius="md" key={index} withBorder>
              <Text weight={500}>{comment.text}</Text>
              <Text size="sm" color="dimmed">{comment.author}</Text>
              <Group position="left" mb="xs">
              {comment.editable && 
              <Button color="red" onClick={(event) => {
                event.preventDefault();
                API.deleteComment(from, comment._id);
              }}>
                Delete Comment
              </Button>
              }
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default Post;
