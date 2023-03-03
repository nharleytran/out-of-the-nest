import Header from '../components/Header';
import { useState, useEffect } from "react";
import { Container, Menu, TextInput, Textarea, FileInput, Divider, Button, Checkbox, Select } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import * as postapi from "../api/index"

function PostCreate() {
    const [outcomevalue] = useState('');
    const [categoryvalue] = useState('');
    const navigate = useNavigate();
    // const [categories, setCategories] = useState([]);
    const [postData, setPostdata] = useState({
        title: "",
        outcome: "",
        content: "",
        author: "",
        category_id: "",
        gpa: 0,
        testscore: "",
        resume: "",
        extracurriculars: ""
    });

    // useEffect(() => {
    //     postapi.getAllCategories()
    //     .then((categories) => setCategories(categories))
    // }, []);
    
    console.log(postapi.getAllCategories())
    // if (!categories) {
    //     return null;
    // }

    const handlePost = async () => {
        try {
            await postapi.createPost(postData)
            navigate("/feed", { state: { postData } });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Container size="lg">
            {JSON.stringify(postData)}

                <h2>Create a post</h2>
                </Container>
                <Container>
                <Select
                    label="Categories"
                    outcomevalue={categoryvalue}
                    placeholder="Pick one"
                    data={[
                        { value: 'Medical School', label: 'Medical School'},
                        { value: 'Software Engineering', label: 'Software Engineering'},
                        { value: 'Consulting', label: "Consulting"},
                        { value: 'Graduate Programs', label: 'Graduate Programs'},
                        { value: 'Other Engineering Professions', label: 'Other Engineering Professions'}
                    ]}
                    onChange={(categoryvalue) => setPostdata({ ...postData, category_id: categoryvalue})}
                    withAsterisk
                />

                
                <TextInput
                    placeholder="Your post title"
                    label="Post title"
                    onChange={(e) => setPostdata({ ...postData, title: e.target.value})}
                    withAsterisk
                />
                <TextInput
                    placeholder="Your author"
                    label="Author"
                    onChange={(e) => setPostdata({ ...postData, author: e.target.value})}
                    withAsterisk
                />
                <Select
                    label="Outcome"
                    outcomevalue={outcomevalue}
                    placeholder="Pick one"
                    data={[
                        { value: 'Accepted', label: 'Accepted'},
                        { value: 'Waitlisted', label: 'Waitlisted'},
                        { value: 'Ghosted', label: "Ghosted"},
                        { value: 'Rejected', label: 'Rejected'}
                    ]}
                    onChange={(outcomevalue) => setPostdata({ ...postData, outcome: outcomevalue})}
                    withAsterisk
                />
                <Textarea
                    placeholder="Add comments"
                    label="Comments"
                    autosize
                    onChange={(e) => setPostdata({ ...postData, content: e.target.value})}
                    withAsterisk
                />
                <TextInput
                    placeholder="Your GPA"
                    label="GPA"
                    onChange={(e) => setPostdata({ ...postData, gpa: e.target.value})}
                    withAsterisk
                />
                <TextInput
                    placeholder="Your test score"
                    label="Test score"
                    onChange={(e) => setPostdata({ ...postData, testscore: e.target.value})}
                    withAsterisk
                />
                <FileInput
                    placeholder="Pick file"
                    label="Your resume"
                    onChange={(e) => setPostdata({ ...postData, resume: e.target.value})}
                />
                <Textarea
                    placeholder="Your extracurriculars"
                    label="Extracurriculars"
                    autosize
                    onChange={(e) => setPostdata({ ...postData, extracurriculars: e.target.value})}
                    withAsterisk
                />

            </Container>
            <Divider my="sm" />
            <div className="flex-end">
                <Button.Group>
                    <Button>Save draft</Button>
                    <Button onClick={handlePost}>Post</Button>
                </Button.Group>
            </div>
        </>

    )
}

export default PostCreate;