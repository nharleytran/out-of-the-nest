import { TextInput } from '@mantine/core';
function Resume(props) {
    const { postData, setPostdata } = props
    return (
        <TextInput
        placeholder="Your resume"
        label="Please enter a shareable link that contains your resume (ex. Google drive)"
        onChange={(e) => setPostdata({ ...postData, resume: e.target.value})}
        withAsterisk
        />
    )
}

export default Resume;