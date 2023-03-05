import { Textarea } from '@mantine/core';
function Extracurriculars(props) {
    const { postData, setPostdata } = props
    return (
        <Textarea
        placeholder="Your extracurriculars"
        label="Extracurriculars"
        autosize
        onChange={(e) => setPostdata({ ...postData, extracurriculars: e.target.value})}
        withAsterisk
        />
    )
}

export default Extracurriculars;