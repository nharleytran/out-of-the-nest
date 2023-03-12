import { TextInput } from '@mantine/core';

function Author(props) {
    const { postData, setPostdata } = props
    return (
        <TextInput
        placeholder="Your author"
        label="Author"
        onChange={(e) => setPostdata({ ...postData, author: e.target.value})}
        withAsterisk
        />
    )
}

export default Author;