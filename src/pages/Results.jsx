import {
    TextInput,
    Container,
    Title,
    Textarea,
    NumberInput,
    Checkbox,
    Button,
    Group,
    Box,
    Select,
    Radio,
    Card,
    Text,
    Avatar,
    Stack,
    ScrollArea,
    Badge
  } from "@mantine/core";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../images/outofthenestlogo.png"


function Results() {
    const location = useLocation();
    const { posts, gpa, testscore, extracurriculars } = location.state;
    const hardCodedGpa = 3.7
    const hardCodedTestScore = "521"
    const hardCodedExtracurricular = [
        { key: '1', content: 'Sports team' },
        { key: '2', content: 'Volunteer at hospital' },
        { key: '3', content: 'Research' },
        { key: '4', content: 'Student government' },
        { key: '5', content: 'On-campus job' }

      ];
    const compareGpa = () => {
        if (gpa < hardCodedGpa) {
            return true;
        } else {
            return false;
        }
    }

    const compareTestScore = () => {
        if (testscore < hardCodedTestScore) {
            return true;
        } else {
            return false;
        }
    }
    console.log(extracurriculars)

    return (
        <>
            <div className="header">
                <Link to={`/`} style={{ textDecoration: 'none' }}>
                    <img src={logo} width="35%" alt="es-lint want to get" />
                </Link>
            </div>
            <div className="note">
                Note: This page currently contains hardcoded data for the statistics shown for other people. In addition, the maximum test score in 'Your Statistics' column is hardcoded right now. This will be changed after the algorithm for this page is created in the next iteration.
            </div>
            <div className="results-container">
                <div className="column">
                    <h2>Your statistics</h2>
                    <div style={{ display: 'flex' }}>
                    <Card style={{ backgroundColor: '#4CAF50', width: '35%', marginRight: '10px' }}>
                            <Card.Section>
                                <Text align="center" style={{ color: 'white' }}>Your GPA is</Text>
                            </Card.Section>
                            <Card.Section align="center">
                                <Avatar size="xl" style={{ backgroundColor: 'white', color: '#4CAF50' }}>
                                {gpa.toFixed(2)}
                                </Avatar>
                                <Text align="center" style={{ color: 'white', marginTop: 10 }}>
                                out of 4.0
                                </Text>
                            </Card.Section>
                        </Card>
                        <Card style={{ backgroundColor: '#FFAE42', width: '35%' }}>
                            <Card.Section>
                                <Text align="center" style={{ color: 'white' }}>Your test score is</Text>
                            </Card.Section>
                            {/^[^0-9]*$/.test(testscore) ? (
                                <Card.Section align="center">
                                    <Avatar size="xl" style={{ backgroundColor: 'white', color: '#4CAF50' }}>
                                        {testscore}
                                    </Avatar>
                                    <Text align="center" style={{ color: 'white', marginTop: 10 }}>
                                        out of {testscore}
                                    </Text>
                                </Card.Section>
                                )
                                :
                                <Card.Section align="center">
                                <Avatar size="xl" style={{ backgroundColor: 'white', color: '#4CAF50' }}>
                                    {testscore}
                                </Avatar>
                                <Text align="center" style={{ color: 'white', marginTop: 10 }}>
                                    out of 1600
                                </Text>
                            </Card.Section>     
                            }
                        </Card>  
                    </div>
                    {extracurriculars.length >= 1 && extracurriculars[0].content.length > 0 && (
                        <h3>Your extracurriculars</h3>
                    )}
                    <ScrollArea h={250}>
                        <ol>
                        {extracurriculars.map((extracurricular, index) => (
                            extracurricular.content.length >= 1 ? 
                            <li key={extracurricular.key}>
                            <Badge>{extracurricular.content}</Badge>
                            </li>
                            : null
                        ))}
                        </ol>
                    </ScrollArea>

                </div>
                <div className="column">
                    <h2>Other people's statistics</h2>
                    <div style={{ display: 'flex' }}>
                        <Card style={{ backgroundColor: '#4CAF50', width: '35%', marginRight: '10px' }}>
                                <Card.Section>
                                    <Text align="center" style={{ color: 'white' }}>Average GPA is</Text>
                                </Card.Section>
                                <Card.Section align="center">
                                    <Avatar size="xl" style={{ backgroundColor: 'white', color: '#4CAF50' }}>
                                    {hardCodedGpa.toFixed(2)}
                                    </Avatar>
                                    <Text align="center" style={{ color: 'white', marginTop: 10 }}>
                                    out of 4.0
                                    </Text>
                                </Card.Section>
                            </Card> 
                        <Card style={{ backgroundColor: '#FFAE42', width: '35%' }}>
                            <Card.Section>
                                <Text align="center" style={{ color: 'white' }}>Average test score is</Text>
                            </Card.Section>
                            {/^[^0-9]*$/.test(hardCodedTestScore) ? (
                                <Card.Section align="center">
                                    <Avatar size="xl" style={{ backgroundColor: 'white', color: '#4CAF50' }}>
                                        {hardCodedTestScore}
                                    </Avatar>
                                    <Text align="center" style={{ color: 'white', marginTop: 10 }}>
                                        out of {hardCodedTestScore}
                                    </Text>
                                </Card.Section>
                                )
                                :
                                <Card.Section align="center">
                                <Avatar size="xl" style={{ backgroundColor: 'white', color: '#4CAF50' }}>
                                    {hardCodedTestScore}
                                </Avatar>
                                <Text align="center" style={{ color: 'white', marginTop: 10 }}>
                                    out of 1600
                                </Text>
                            </Card.Section>     
                            }
                        </Card>
                    </div>
                    {/* Replace with post data extracurriculars in next iteration
                    {extracurriculars.length == 1 && extracurriculars[0].content.length > 0 && (
                        <h3>Your extracurriculars</h3>
                    )} */}
                    <h3>Other people's extracurriculars</h3>
                    <ScrollArea h={250}>
                        <ol>
                        {hardCodedExtracurricular.map((extracurricular, index) => (
                            extracurricular.content.length >= 1 ? 
                            <li key={extracurricular.key}>
                            <Badge>{extracurricular.content}</Badge>
                            </li>
                            : null
                        ))}
                        </ol>
                    </ScrollArea>


                </div>
                <div className="column">
                    <h2>Success Recipe</h2>
                    <ScrollArea h={250} className="recipe-border">
                        <h3>Improving your GPA</h3>
                        <p>The number one thing that is essential to improving your GPA is attending your classes regularly! You won't miss any detailed explanations from the professor and it allows you to participate in class. Being in class will help you in many ways. For example, the classes will supplement your learning. You will be able to cut down on your study time later with how much you have learned and retained from attending class. </p>
                        <p>Join a study group! You can get your friend or classmates together to study together in a class. Its important to have a support system where you can share notes, discuss different class topics, and ask questions to each other.</p>
                        <h3>Improving your test score</h3>
                        <p>Cultivate good study habits. We often cannot study the day before an exam to do well. Developing good study habits will help you in performing better on exams. This process includes steps such as reviewing your notes frequently and doing your homework assignments. </p>
                        <p>Get a good night's sleep. Make sleep a priority as it will help you think more clearly during the test. In addition, having a good sleep habit has been shown to consolidate memory and improve academic performance.</p>
                        <h3>Improving your extracurriculars</h3>
                        <p>Look to volunteer in your local community! Doing volunteer work demonstrates leadership and passion. It can be a good way to show reviewers of your application to jobs or schools in what type of person you are.</p>
                        <p>If you are applying for different jobs, make sure you apply to a lot. Often, it takes days or weeks for a job application to give an update back to you. Make sure you keep your options open. </p>
                    </ScrollArea>
                    
                </div>
            </div>
        </>
    )
}

export default Results;