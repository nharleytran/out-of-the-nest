import { Textarea } from '@mantine/core';
function Comments(props) {
    const { postData, setPostdata, comment } = props
    return (
        <Textarea
        placeholder="Add comments"
        defaultValue={comment}
        label="Comments"
        autosize
        onChange={(e) => setPostdata({ ...postData, content: e.target.value})}
        withAsterisk
        />
    )
}

export default Comments;