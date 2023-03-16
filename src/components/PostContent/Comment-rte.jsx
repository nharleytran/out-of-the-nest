import { RichTextEditor } from '@mantine/rte';
import { useState, useEffect } from 'react';

function CommentsNew(props) {
  const { postData, setPostdata, comment } = props;
  const [text, setText] = useState("");

  useEffect(() => {
    setText(comment);
    console.log(text);
  }, []);

  return (
      <RichTextEditor
      placeholder="Add comments"
      id="rte"
      value={text}
      label="Comments"
      onChange={(e) => setPostdata({ ...postData, content: e.target.value })}
      />
  );
}

export default CommentsNew;