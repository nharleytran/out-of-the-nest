import {
  Card,
  Text,
  Avatar,
  ScrollArea,
  Badge,
  Grid,
  Title,
  LoadingOverlay,
  Container,
  Notification,
  Loader
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { useLocation, Link } from 'react-router-dom'
import ParticlesBg from 'particles-bg'
import logo from '../images/outofthenestlogo.png'
import { useEffect, useState } from 'react'
import { getSuggestion } from "../api/recipe";

function Results() {
  const location = useLocation()
  const { posts, gpa, testscore, extracurriculars, comment } = location.state;
  const [visible, { toggle }] = useDisclosure(true);
  const hardCodedGpa = 3.7
  const hardCodedTestScore = '521'
  const hardCodedExtracurricular = [
    { key: '1', content: 'Sports team' },
    { key: '2', content: 'Volunteer at hospital' },
    { key: '3', content: 'Research' },
    { key: '4', content: 'Student government' },
    { key: '5', content: 'On-campus job' },
  ]
  const extracurricular_string = extracurriculars.map((item) => item.content).join(', ');
  const [response, setResponse] = useState("");
  const [loader, setLoader] = useState(<Loader  variant="bars"/>);

  useEffect(() => {
    getSuggestion({ 'gpa': gpa, 'testscore': testscore, 'extracurriculars': extracurricular_string, 'comment': comment }).then(data => {
      setResponse(data.result);
      // toggle();
      setLoader(<></>);
    })
  }, []);
  
  return (
    <div className="results">
      <div className="resultsbg"></div>
      {/* ParticlesBg type: "color","ball","lines","thick","circle","cobweb","polygon","square","tadpole","fountain","random","custom" */}
      <ParticlesBg type="cobweb" bg={true} />
      <div className="header">
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <img src={logo} width="35%" alt="es-lint want to get" />
        </Link>
      </div>
      {/* <Paper className="note" shadow="lg" radius="lg" p="md">
            Note: This page currently contains hardcoded data for the statistics shown for other people. In addition, the maximum test score in 'Your Statistics' column is hardcoded right now. This will be changed after the algorithm for this page is created in the next iteration.
            </Paper> */}

      <div className="results-main">
        <Title order={1} align="center" className="results-main-title">
          Success Recipe
        </Title>
        <Container size="lg">
          <Grid
            gutter={5}
            gutterXs="md"
            gutterMd="xl"
            gutterXl={50}
            className="results-container" pos="relative">

            <Grid.Col span={6}>
              <div className="flipInX animated results-circle results-circle1">
                <Text align="center" mt={25}>
                  Your GPA is
                </Text>
                <Avatar
                  size="xl"
                  className="results-avatar"
                  style={{ color: '#000' }}>
                  {gpa.toFixed(2)}
                </Avatar>
                <Text align="center" style={{ marginTop: 10 }}>
                </Text>
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className="flipInX animated results-circle results-circle2">
                <Card.Section>
                  <Text align="center" mt={25}>
                    Average GPA is
                  </Text>
                </Card.Section>
                <Card.Section align="center">
                  <Avatar
                    size="xl"
                    className="results-avatar"
                    style={{ color: '#000' }}>
                    {hardCodedGpa.toFixed(2)}
                  </Avatar>
                  <Text align="center" style={{ marginTop: 10 }}>
                    out of 4.0
                  </Text>
                </Card.Section>
              </div>
            </Grid.Col>

            <Grid.Col span={12} >
              
              <Card>
                <ScrollArea>

                  <Text align='justify'>
                  {/* <LoadingOverlay visible={visible} overlayBlur={2} /> */}
                  {loader}
                    {response}
                  </Text>
                </ScrollArea>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default Results
