import { LoremIpsum } from "lorem-ipsum";
import {
  TextInput,
  Container,
  Title,
  Textarea,
  NumberInput,
  Checkbox,
  Button,
  Group,
  Box,
  Select,
  Radio
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as postapi from "../api/index";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const empty_post = {
  title: "",
  outcome: "",
  content: "",
  author: "",
  category_id: "",
  gpa: 0,
  testscore: "",
  resume: "",
  extracurriculars: "",
  international: false,
  anonymous: false
};
const random_post = () => {
  return {
    title: lorem.generateWords(5),
    content: lorem.generateParagraphs(2),
    gpa: 3.5,
    testscore: 1500,
    resume: "https://www.google.com",
    extracurriculars: ["eng", "club"]
  };
};
const dummy_generate = () => {
  return random_post();
  // if (process.env.NODE_ENV === "development") {
  //   return random_post();
  // } else {
  //   return empty_post;
  // }
};

const PostCreate = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: "",
      outcome: "",
      content: "",
      category_id: "",
      gpa: 0,
      testscore: "",
      resume: "",
      extracurriculars: "",
      international: false,
      anonymous: false
    }
  });
  const [categories, setCategories] = useState([]);

  const outcomeList = [
    {
      value: "Accepted",
      label: "Accepted"
    },
    {
      value: "Waitlisted",
      label: "Waitlisted"
    },
    {
      value: "Ghosted",
      label: "Ghosted"
    },
    {
      value: "Rejected",
      label: "Rejected"
    }
  ];
  useEffect(() => {
    const fetchData = async () => {
      const fetchData = await postapi.getAllCategories();
      const randomId =
        fetchData[Math.floor(Math.random() * fetchData.length)]._id;
      form.setValues(dummy_generate());
      form.setFieldValue("category_id", randomId);
      setCategories(
        fetchData.map(category => ({
          value: category._id,
          label: category.name
        }))
      );
    };
    form.setFieldValue(
      "outcome",
      outcomeList[Math.floor(Math.random() * 4)].value
    );
    fetchData();
  }, []);
  const handleSubmit = async data => {
    // const data = await postapi.createPost(form.values);
    // navigate(`/post/${data._id}`);
    await postapi.createPost(data);
    navigate("/", { state: { data } });
  };

  return (
    <Box maw={500} mx="auto">
      <Title order={2}>Create a post</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Select a category to submit your post to"
          value={form.values.category_id}
          placeholder="Pick one"
          data={categories}
          onChange={categoryvalue =>
            form.setFieldValue("category_id", categoryvalue)}
          withAsterisk
        />
        <TextInput
          placeholder="Your post title"
          label="Post title"
          {...form.getInputProps("title", {
            type: "text"
          })}
          withAsterisk
        />
        <Select
          label="Outcome"
          value={form.values.outcome}
          data={outcomeList}
          onChange={outcomevalue => {
            form.setFieldValue("outcome", outcomevalue);
          }}
          withAsterisk
        />
        <Textarea
          placeholder="Add comments"
          label="Comments"
          autosize
          {...form.getInputProps("content", {
            type: "text"
          })}
          withAsterisk
        />
        <NumberInput
          placeholder="Your GPA"
          label="GPA"
          precision={2}
          min={0.0}
          {...form.getInputProps("gpa", {
            type: "number"
          })}
          step={0.01}
          withAsterisk
        />
        <TextInput
          placeholder="Your test score"
          label="Test score"
          {...form.getInputProps("testscore", {
            type: "text"
          })}
          withAsterisk
        />
        <TextInput
          placeholder="Your resume"
          label="Please enter a shareable link that contains your resume (ex. Google drive)"
          {...form.getInputProps("resume", {
            type: "text"
          })}
          withAsterisk
        />
        <Textarea
          placeholder="Your extracurriculars"
          label="Extracurriculars"
          autosize
          {...form.getInputProps("extracurriculars", {
            type: "text"
          })}
          withAsterisk
        />

        <Checkbox
          label="I am an International Student"
          onChange={event => {
            form.setValues({
              ...form.values,
              international: event.currentTarget.checked
            });
          }}
          style={{ marginTop: "10px", marginBottom: "20px" }}
        />

        <Checkbox
          label="Check to make the post anonymous"
          onChange={event => {
            form.setValues({
              ...form.values,
              anonymous: event.currentTarget.checked
            });
          }}
          style={{ marginTop: "10px", marginBottom: "20px" }}
        />
        <Group position="right" mt="md">
          <Button>Save draft</Button>
          <Button type="submit"> Post </Button>{" "}
          <Button onClick={() => navigate("/")}>Cancel</Button>
        </Group>{" "}
      </form>{" "}
    </Box>
  );
};
export default PostCreate;
