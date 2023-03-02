import Header from '../components/Header';
import { Container, Divider, Button, Text } from '@mantine/core';
import { Link } from "react-router-dom";
import * as API from '../api'

function Post() {

  const deleteHandle = (event) => {
    event.preventDefault();
    //API.deletePost()
  };

    return (
        <div>
        <Header/>
        <Divider my="sm" />
        <h2 align="center">Post 1</h2>
        <Container>
          <Text fz="md">GPA:</Text>
          <Text fz="md">Test Score:</Text>
          <Text fz="md">Resume File:</Text>
          <Text fz="md">Cover Letter:</Text>
          <Text fz="md">Additional Comments:</Text>
        </Container>
        <Divider my="sm" />
        <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Edit draft</Button>
        <Link to={`/feed`}>
          <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} onclick={deleteHandle}>DeletePost</Button>
        </Link>
        </div>

    )
}

export default Post;