import { TextInput } from '@mantine/core';
function EditGPA(props) {
    const { postData, setPostdata, gpa } = props;
    return (
      <TextInput
      defaultValue={gpa}
      label="GPA"
      onChange={(e) => setPostdata({ ...postData, gpa: e.target.value})}
      withAsterisk
      />
    )
}

export default EditGPA;