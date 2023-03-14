import { useState, useEffect } from "react";
import { Container, Divider, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import * as postapi from "../api/index";
import Category from "../components/PostContent/Category";
import Title from "../components/PostContent/Title";
import Author from "../components/PostContent/Author";
import Comments from "../components/PostContent/Comments";
import Gpa from "../components/PostContent/Gpa";
import Outcome from "../components/PostContent/Outcome";
import Resume from "../components/PostContent/Resume";
import Testscore from "../components/PostContent/Testscore";
import Extracurriculars from "../components/PostContent/Extracurriculars";

function PostCreate() {
  const [outcomevalue] = useState("");
  const [categoryvalue] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [postData, setPostdata] = useState({
    title: "",
    outcome: "",
    content: "",
    author: "",
    category_id: "",
    gpa: 0,
    testscore: "",
    resume: "",
    extracurriculars: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const categories = await postapi.getAllCategories();
      setCategories(categories);
    };
    fetchData();
  }, []);

  const handlePost = async () => {
    try {
      await postapi.createPost(postData);
      navigate("/", { state: { postData } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container size="lg">
        <div className="alignLeft">
          <h1>Create a post</h1>
        </div>
      </Container>
      <Container>
        <Category
          categoryvalue={categoryvalue}
          postData={postData}
          setPostdata={setPostdata}
          categories={categories}
        />
        <Title postData={postData} setPostdata={setPostdata} />
        <Author postData={postData} setPostdata={setPostdata} />
        <Outcome
          outcomevalue={outcomevalue}
          postData={postData}
          setPostdata={setPostdata}
        />
        <Comments postData={postData} setPostdata={setPostdata} />
        <Gpa postData={postData} setPostdata={setPostdata} />
        <Testscore postData={postData} setPostdata={setPostdata} />
        <Resume postData={postData} setPostdata={setPostdata} />
        <Extracurriculars postData={postData} setPostdata={setPostdata} />
      </Container>
      <Divider my="sm" />
      <div className="alignButtonRight">
        <Button.Group>
          <div className="separateButton">
            <Button>Save draft</Button>
          </div>
          <div className="separateButton">
            <Button onClick={handlePost}>Post</Button>
          </div>
          <div className="separateButton">
            <Button onClick={() => navigate("/")}>Cancel</Button>
          </div>
        </Button.Group>
      </div>
    </>
  );
}

export default PostCreate;
