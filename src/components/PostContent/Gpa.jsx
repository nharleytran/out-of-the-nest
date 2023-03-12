import { NumberInput } from '@mantine/core';
function Gpa(props) {
    const { postData, setPostdata } = props
    return (
        <NumberInput
        placeholder="Your GPA"
        label="GPA"
        precision={2}
        min={0.00}
        onChange={(value) => setPostdata({ ...postData, gpa: value})}
        step={0.01}
        withAsterisk
        />
    )
}

export default Gpa;