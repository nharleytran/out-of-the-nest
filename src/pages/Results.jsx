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
            <div className="flipInX animated results-circle results-circle1">
              <Text align="center" mt={25}>
                Your test score is
              </Text>
              {/^[^0-9]*$/.test(testscore) ? (
                <>
                  <Avatar
                    size="xl"
                    className="results-avatar"
                    style={{ color: '#000' }}>
                    {testscore}
                  </Avatar>
                  <Text align="center" style={{ marginTop: 10 }}>
                    out of {testscore}
                  </Text>
                </>
              ) : (
                <>
                  <Avatar
                    size="xl"
                    className="results-avatar"
                    style={{ color: '#000' }}>
                    {testscore}
                  </Avatar>
                  <Text align="center" style={{ marginTop: 10 }}>
                    out of 1600
                  </Text>
                </>
              )}
            </div>
            <div className="extracurriculars extracurriculars1">
              <Title align="center" order={3} pt={10}>
                Your extracurriculars
              </Title>
              <ScrollArea h={280} mt={12}>
                <ol>
                  {extracurriculars.map((extracurricular, index) =>
                    extracurricular.content.length >= 1 ? (
                      <li key={extracurricular.key}>
                        <Badge>{extracurricular.content}</Badge>
                      </li>
                    ) : null
                  )}
                </ol>
              </ScrollArea>
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
            <div className="flipInX animated results-circle results-circle2">
              <Card.Section>
                <Text align="center" mt={25}>
                  Average test score is
                </Text>
              </Card.Section>
              {/^[^0-9]*$/.test(hardCodedTestScore) ? (
                <>
                  <Avatar
                    size="xl"
                    className="results-avatar"
                    style={{ color: '#000' }}>
                    {hardCodedTestScore}
                  </Avatar>
                  <Text align="center" style={{ marginTop: 10 }}>
                    out of {hardCodedTestScore}
                  </Text>
                </>
              ) : (
                <>
                  <Avatar
                    size="xl"
                    className="results-avatar"
                    style={{ color: '#000' }}>
                    {hardCodedTestScore}
                  </Avatar>
                  <Text align="center" style={{ marginTop: 10 }}>
                    out of 1600
                  </Text>
                </>
              )}
            </div>
            <div className="extracurriculars extracurriculars2">
              <Title align="center" order={3} pt={10}>
                Other people's extracurriculars
              </Title>
              <ScrollArea h={280} mt={12}>
                <ol>
                  {hardCodedExtracurricular.map((extracurricular, index) =>
                    extracurricular.content.length >= 1 ? (
                      <li key={extracurricular.key}>
                        <Badge>{extracurricular.content}</Badge>
                      </li>
                    ) : null
                  )}
                </ol>
              </ScrollArea>
            </div>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card>
              <ScrollArea h={190}>
                <Title order={3}>Improving your GPA</Title>
                <Text>
                  The number one thing that is essential to improving your GPA
                  is attending your classes regularly! You won't miss any
                  detailed explanations from the professor and it allows you to
                  participate in class. Being in class will help you in many
                  ways. For example, the classes will supplement your learning.
                  You will be able to cut down on your study time later with how
                  much you have learned and retained from attending class.{' '}
                </Text>
                <Text>
                  Join a study group! You can get your friend or classmates
                  together to study together in a class. Its important to have a
                  support system where you can share notes, discuss different
                  class topics, and ask questions to each other.
                </Text>
              </ScrollArea>
            </Card>
            <Card mt={20}>
              <ScrollArea h={190}>
                <Title order={3}>Improving your test score</Title>
                <Text>
                  Cultivate good study habits. We often cannot study the day
                  before an exam to do well. Developing good study habits will
                  help you in performing better on exams. This process includes
                  steps such as reviewing your notes frequently and doing your
                  homework assignments.{' '}
                </Text>
                <Text>
                  Get a good night's sleep. Make sleep a priority as it will
                  help you think more clearly during the test. In addition,
                  having a good sleep habit has been shown to consolidate memory
                  and improve academic performance.
                </Text>
              </ScrollArea>
            </Card>
            <Card mt={20}>
              <ScrollArea h={190}>
                <Title order={3} mt={10}>
                  Improving your extracurriculars
                </Title>
                <Text>
                  Look to volunteer in your local community! Doing volunteer
                  work demonstrates leadership and passion. It can be a good way
                  to show reviewers of your application to jobs or schools in
                  what type of person you are.
                </Text>
                <Text>
                  If you are applying for different jobs, make sure you apply to
                  a lot. Often, it takes days or weeks for a job application to
                  give an update back to you. Make sure you keep your options
                  open.{' '}
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
