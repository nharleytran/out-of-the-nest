import { useState, useEffect,} from "react";
import { Container, TextInput, Textarea, Divider, Button, Select } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import * as postapi from "../api/index"

function PostCreate() {
    const [outcomevalue] = useState('');
    const [categoryvalue] = useState('');
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
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

    useEffect(()=>{
        const fetchData = async () => {
            const categories = await postapi.getAllCategories();
            setCategories(categories);
        }
        fetchData();
    }, []);
    
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
                <div className = "alignLeft">
                    <h1>Create a post</h1>
                </div>
                </Container>
                <Container>
                <Select
                    label="Select a category to submit your post to"
                    outcomevalue={categoryvalue}
                    placeholder="Pick one"
                    data={categories.map((category) => ({
                        value: category._id,
                        label: category.name
                    }))}
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
                <TextInput
                    placeholder="Your resume"
                    label="Please enter a shareable link that contains your resume (ex. Google drive)"
                    onChange={(e) => setPostdata({ ...postData, resume: e.target.value})}
                    withAsterisk
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

export default PostCreate;