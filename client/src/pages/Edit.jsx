import { useState, useEffect,} from "react";
import { Container, TextInput, Textarea, Divider, Button, Select } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import * as postapi from "../api/index"

function Edit() {

    const location = useLocation();
    const { from } = location.state;
    const [id, setID] = useState('');
    const [outCome, setOutcome] = useState('');
    const [gpa, setGpa] = useState("");
    const [score, setScore] = useState("");
    const [resume, setResume] = useState("");
    const [extra, setExtra] = useState("");
    const [comment, setComment] = useState("");

    const [outcomevalue] = useState('');
    const navigate = useNavigate();
    const [postData, setPostdata] = useState({
        outcome: "",
        content: "",
        gpa: 0,
        testscore: "",
        resume: "",
        extracurriculars: ""
    });

    

    useEffect(()=>{
        // const fetchData = async () => {
        //     const categories = await postapi.getAllCategories();
        //     setCategories(categories);
        // }
        postapi.getPost(from).then(data => {;
          setID(data._id);
          setOutcome(data.outcome);
          setGpa(data.gpa);
          setScore(data.testscore);
          setResume(data.resume);
          setExtra(data.extracurriculars);
          setComment(data.content);
        })
        // fetchData();
    }, []);
    
    const handlePost = async () => {
        try {
            await postapi.updatePost(id, postData);
            navigate("/", { state: { postData } });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Container size="lg">
                <div className = "alignLeft">
                    <h1>Edit Your Post</h1>
                </div>
                </Container>
                <Container>   
                <Select
                    label="Outcome"
                    defaultValue={outCome}
                    data={[
                        { value: 'Accepted', label: 'Accepted'},
                        { value: 'Waitlisted', label: 'Waitlisted'},
                        { value: 'Ghosted', label: 'Ghosted'},
                        { value: 'Rejected', label: 'Rejected'}
                    ]}
                    onChange={(outcomevalue) => setPostdata({ ...postData, outcome: outcomevalue})}
                    withAsterisk
                />
                <Textarea
                    defaultValue={comment}
                    label="Comments"
                    autosize
                    onChange={(e) => setPostdata({ ...postData, content: e.target.value})}
                    withAsterisk
                />
                <TextInput
                    defaultValue={gpa}
                    label="GPA"
                    onChange={(e) => setPostdata({ ...postData, gpa: e.target.value})}
                    withAsterisk
                />
                <TextInput
                    defaultValue={score}
                    label="Test score"
                    onChange={(e) => setPostdata({ ...postData, testscore: e.target.value})}
                    withAsterisk
                />
                <TextInput
                    defaultValue={resume}
                    label="Please enter a shareable link that contains your resume (ex. Google drive)"
                    onChange={(e) => setPostdata({ ...postData, resume: e.target.value})}
                    withAsterisk
                />
                <Textarea
                    defaultValue={extra}
                    label="Extracurriculars"
                    autosize
                    onChange={(e) => setPostdata({ ...postData, extracurriculars: e.target.value})}
                    withAsterisk
                />
            </Container>
            <Divider my="sm" />
            <div className="alignButtonRight">
                <Button.Group>
                    <div className="separateButton">
                        <Button>Save draft</Button>
                    </div>
                    <Button onClick={handlePost}>Post</Button>
                </Button.Group>
            </div>
        </>

    )
}

export default Edit;