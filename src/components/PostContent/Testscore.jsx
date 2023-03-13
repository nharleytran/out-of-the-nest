import { TextInput } from "@mantine/core";
function Testscore(props) {
  const { postData, setPostdata, score } = props;
  return (
    <TextInput
      placeholder="Your test score"
      defaultValue={score}
      label="Test score"
      onChange={(e) => setPostdata({ ...postData, testscore: e.target.value })}
      withAsterisk
    />
  );
}

export default Testscore;
