import {
    Card,
    Text,
    Avatar,
    ScrollArea,
    Badge
} from "@mantine/core";
import { useLocation, Link } from "react-router-dom";
import logo from "../images/outofthenestlogo.png"
import { useEffect, useState } from "react";
import { getSuggestion } from "../api/recipe";


function Results() {
    const location = useLocation();
    const { posts, gpa, testscore, extracurriculars,comment } = location.state;
    const hardCodedGpa = 3.7
    const hardCodedTestScore = "521"
    const hardCodedExtracurricular = [
        { key: '1', content: 'Sports team' },
        { key: '2', content: 'Volunteer at hospital' },
        { key: '3', content: 'Research' },
        { key: '4', content: 'Student government' },
        { key: '5', content: 'On-campus job' }

    ];
    const [response, setResponse] = useState("");
    const extracurricular_string = extracurriculars.map((item) => item.content).join(', ');
    useEffect(() => {
        getSuggestion({'gpa': gpa, 'testscore':testscore, 'extracurriculars': extracurricular_string, 'comment': comment}).then(data=>{
            setResponse(data.result);
        })
    },[]);


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
                    {response}
                    </ScrollArea>

                </div>
            </div>
        </>
    )
}

export default Results;