import { TextInput } from '@mantine/core';
function Title (props) {
    const { postData, setPostdata } = props
    return (
        <TextInput
        placeholder="Your post title"
        label="Post title"
        onChange={(e) => setPostdata({ ...postData, title: e.target.value})}
        withAsterisk
        />
    )
}

export default Title;