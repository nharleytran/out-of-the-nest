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
  name: "",
  outcome: "",
  bio: "",
  address: "",
  email: "",
  phone: "",
  gpa: 0,
  testscore: "",
  resume: "",
  extracurriculars: "",
};
const random_post = () => {
  return {
    title: lorem.generateWords(5),
    bio: lorem.generateParagraphs(2),
    address: lorem.word(5),
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

const UserProfile = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: "",
      outcome: "",
      bio: "",
      address: "",
      gpa: 0,
      testscore: "",
      resume: "",
      extracurriculars: "",
      international: false,
    }
  });

  useEffect(() => {
    const fetchData = async () => {
    };
  }, []);
  const handleSubmit = async data => {
    // const data = await postapi.createPost(form.values);
    // navigate(`/post/${data._id}`);
    await postapi.createPost(data);
    navigate("/", { state: { data } });
  };

  return (
    <Box maw={500} mx="auto">
      <Title order={2}>User Profile</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder="Your post title"
          label="Name"
          {...form.getInputProps("name", {
            type: "text"
          })}
          withAsterisk
        />
        <TextInput
          placeholder="Your post title"
          label="Email"
          {...form.getInputProps("email", {
            type: "text"
          })}
          withAsterisk
        />
        <TextInput
          placeholder="Your post title"
          label="Address"
          {...form.getInputProps("address", {
            type: "text"
          })}
          withAsterisk
        />
        <TextInput
          placeholder="Your post title"
          label="address"
          {...form.getInputProps("name", {
            type: "text"
          })}
          withAsterisk
        />
        <Textarea
          placeholder="Add comments"
          label="Bio"
          autosize
          {...form.getInputProps("bio", {
            type: "text"
          })}
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
          placeholder="Your resume"
          label="Please enter a shareable link that contains your resume (ex. Google drive)"
          {...form.getInputProps("resume", {
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

        <Group position="right" mt="md">
          <Button type="submit"> Update </Button>{" "}
          <Button onClick={() => navigate("/")}>Cancel</Button>
        </Group>{" "}
      </form>{" "}
    </Box>
  );
};
export default UserProfile;
