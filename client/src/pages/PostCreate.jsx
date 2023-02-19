import Header from '../components/Header';
import { Container, Menu, TextInput, Textarea, FileInput, Divider, Button } from '@mantine/core';

function PostCreate() {
    return (
        <div>
        <Header/>
        
        <h2>Create a post</h2>
        <Container size="lg">

        <Menu shadow="md" width={650}>
            <Menu.Target>
                <Button>Categories</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item>Medical School</Menu.Item>
                <Menu.Item>Software Engineering</Menu.Item>
                <Menu.Item>Consulting</Menu.Item>
                <Menu.Item>Graduate Programs</Menu.Item>
                <Menu.Item>Other Engineering Professions</Menu.Item>
            </Menu.Dropdown>
        </Menu>
        </Container>
        <Container>
        <TextInput
            placeholder="Your post title"
            label="Post title"
            withAsterisk
        />
        <TextInput
            placeholder="Your GPA"
            label="GPA"
            withAsterisk
        />
        <TextInput
            placeholder="Your test score"
            label="Test score"
            withAsterisk
        />
        <FileInput
            placeholder="Pick file"
            label="Your resume"
        />
        <FileInput
            placeholder="Pick file"
            label="Your cover letter"
        />
        <Textarea
            placeholder="Add additional comments"
            label="Additional comments"
        />
        </Container>
        <Divider my="sm" />
        <Button.Group>
            <Button>Save draft</Button>
            <Button>Post</Button>
        </Button.Group>

        </div>

    )
}

export default PostCreate;