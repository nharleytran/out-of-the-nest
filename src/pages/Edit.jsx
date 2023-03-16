import { useState, useEffect } from 'react'
import {
  Container,
  Button,
  Title,
  Space,
  Group,
  Grid, SimpleGrid, Skeleton, useMantineTheme, rem
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as postapi from "../api/index";
import Comments from "../components/PostContent/Comments";
import Outcome from "../components/PostContent/Outcome";
import Resume from "../components/PostContent/Resume";
import Testscore from "../components/PostContent/Testscore";
import Extracurriculars from "../components/PostContent/Extracurriculars";
import EditGPA from "../components/PostContent/EditGPA";

const PRIMARY_COL_HEIGHT = rem(300);

function Edit() {
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const [id, setID] = useState('')
  const [outCome, setOutcome] = useState('')
  const [gpa, setGpa] = useState('')
  const [score, setScore] = useState('')
  const [resume, setResume] = useState('')
  const [extra, setExtra] = useState('')
  const [comment, setComment] = useState('')

  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  const navigate = useNavigate();
  const [postData, setPostdata] = useState({
    outcome: '',
    content: '',
    gpa: 0,
    testscore: '',
    resume: '',
    extracurriculars: '',
  })

  useEffect(() => {
    postapi.getPost(from).then((data) => {
      setID(data._id)
      setOutcome(data.outcome)
      setGpa(data.gpa)
      setScore(data.testscore)
      setResume(data.resume)
      setExtra(data.extracurriculars)
      setComment(data.content)
    })
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  const handlePost = async () => {
    try {
      await postapi.updatePost(id, postData)
      navigate('/', { state: { postData } })
    } catch (err) {
      console.log(err)
    }
  }

  return (
  
    <Container my="md">
      <Group position="apart">
        <Title size="h2" color={"blue"}>
          Edit Your Post
        </Title>
        <Button onClick={handlePost}>Click Here to Post!</Button>
      </Group>
      <Grid>
        <Grid.Col xs={6}>
          <Outcome height={SECONDARY_COL_HEIGHT} radius="md" color="red"
            outcomevalue={outCome}
            postData={postData}
            setPostdata={setPostdata}
          />
        </Grid.Col>
        <Grid.Col xs={6}>
          <EditGPA height={SECONDARY_COL_HEIGHT} radius="md" postData={postData} setPostdata={setPostdata} gpa={gpa} />
        </Grid.Col>
        <Grid.Col xs={6}>
          <Testscore height={SECONDARY_COL_HEIGHT} radius="md"
            postData={postData}
            setPostdata={setPostdata}
            score={score}
          />
        </Grid.Col>
        <Grid.Col xs={6}>
          <Extracurriculars height={SECONDARY_COL_HEIGHT} radius="md"
            postData={postData}
            setPostdata={setPostdata}
            extra={extra}
          />
        </Grid.Col>
        <Grid.Col xs={12}>
          <Resume height={SECONDARY_COL_HEIGHT} radius="md" postData={postData} setPostdata={setPostdata} res={resume} />
        </Grid.Col>
        <Grid.Col xs={12}>
          <Comments height={PRIMARY_COL_HEIGHT}
            postData={postData}
            setPostdata={setPostdata}
            comment={comment}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Edit
