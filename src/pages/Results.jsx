import {
  Card,
  Text,
  Avatar,
  ScrollArea,
  Badge,
  Grid,
  Title,
} from '@mantine/core'
import { useLocation, Link } from 'react-router-dom'
import ParticlesBg from 'particles-bg'
import logo from '../images/outofthenestlogo.png'

function Results() {
  const location = useLocation()
  const { gpa, testscore, extracurriculars } = location.state
  const hardCodedGpa = 3.7
  const hardCodedTestScore = '521'
  const hardCodedExtracurricular = [
    { key: '1', content: 'Sports team' },
    { key: '2', content: 'Volunteer at hospital' },
    { key: '3', content: 'Research' },
    { key: '4', content: 'Student government' },
    { key: '5', content: 'On-campus job' },
  ]

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
        <Grid
          gutter={5}
          gutterXs="md"
          gutterMd="xl"
          gutterXl={50}
          className="results-container">
          <Grid.Col span={4}>
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
                out of 4.0
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col span={4}>
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
          <Grid.Col span={4}>
            <Card>
              <ScrollArea h={190}>
                <Title order={3}>Our suggestion</Title>
                <Text>
                </Text>
              </ScrollArea>
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  )
}

export default Results
