import { useState, useEffect } from "react";
import {
  Container,
  TextInput,
  Textarea,
  Divider,
  Button,
  Select,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as postapi from "../api/index";
import Comments from "../components/PostContent/Comments";
import Outcome from "../components/PostContent/Outcome";
import Resume from "../components/PostContent/Resume";
import Testscore from "../components/PostContent/Testscore";
import Extracurriculars from "../components/PostContent/Extracurriculars";
import EditGPA from "../components/PostContent/EditGPA";

function Edit() {
  const location = useLocation();
  const { from } = location.state;
  const [id, setID] = useState("");
  const [outCome, setOutcome] = useState("");
  const [gpa, setGpa] = useState("");
  const [score, setScore] = useState("");
  const [resume, setResume] = useState("");
  const [extra, setExtra] = useState("");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const [postData, setPostdata] = useState({
    outcome: "",
    content: "",
    gpa: 0,
    testscore: "",
    resume: "",
    extracurriculars: "",
  });

  useEffect(() => {
    postapi.getPost(from).then((data) => {
      setID(data._id);
      setOutcome(data.outcome);
      setGpa(data.gpa);
      setScore(data.testscore);
      setResume(data.resume);
      setExtra(data.extracurriculars);
      setComment(data.content);
    });
  }, []);

  const handlePost = async () => {
    try {
      await postapi.updatePost(id, postData);
      navigate("/", { state: { postData } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container size="lg">
        <div className="alignLeft">
          <h1>Edit Your Post</h1>
        </div>
      </Container>
      <Container>
        <Outcome
          outcomevalue={outCome}
          postData={postData}
          setPostdata={setPostdata}
        />
        <Comments
          postData={postData}
          setPostdata={setPostdata}
          comment={comment}
        />
        <EditGPA postData={postData} setPostdata={setPostdata} gpa={gpa} />
        <Testscore
          postData={postData}
          setPostdata={setPostdata}
          score={score}
        />
        <Resume postData={postData} setPostdata={setPostdata} res={resume} />
        <Extracurriculars
          postData={postData}
          setPostdata={setPostdata}
          extra={extra}
        />
      </Container>
      <Divider my="sm" />
      <div className="alignButtonRight">
        <Button.Group>
          <div className="separateButton">
            <Button>Save draft</Button>
          </div>
          <Button onClick={handlePost}>Post</Button>
        </Button.Group>
      </div>
    </>
  );
}

export default Edit;
