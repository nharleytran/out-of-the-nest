import { LoremIpsum } from "lorem-ipsum";
import { Avatar, AvatarsGroup } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
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
  Radio,
  FileInput,
  rem
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
    bio: lorem.generateParagraphs(2),
    address: lorem.generateWords(5),
    school: lorem.generateWords(5),
    interests: lorem.generateWords(5),
    resume: "https://www.google.com",
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
      bio: "",
      address: "",
      gpa: 0,
      testscore: "",
      resume: "",
      school: "",
      interests: "",
      profile_image: "",
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const user_id = localStorage.getItem("user_id");
      postapi.getUser(user_id).then(data => {
        form.setValues(data);
      });
    };
    form.setValues(dummy_generate());
    fetchData();
  }, []);
  const handleSubmit = async data => {
    const user_id = localStorage.getItem("user_id");
    console.log(data);
    await postapi.updateUserProfile(user_id, data);
    // navigate("/", { state: { data } });

  };

  return (
    <Box maw={500} mx="auto">
      <Title order={2}>User Profile</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Avatar radius="md" size={200} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" />
        <FileInput label="profile_image" placeholder="Upload files" accept="image/png,image/jpeg" icon={<IconUpload size={rem(14)} />} />
        <TextInput
          placeholder="Your name"
          label="Name"
          {...form.getInputProps("name", {
            type: "text"
          })}
          withAsterisk
        />
        <TextInput
          placeholder="Your email"
          disabled
          label="Email"
          {...form.getInputProps("email", {
            type: "text"
          })}
        />
        <TextInput
          placeholder="Your address"
          label="Address"
          {...form.getInputProps("address", {
            type: "text"
          })}
        />
        <TextInput
          placeholder="Your school"
          label="School"
          {...form.getInputProps("school", {
            type: "text"
          })}
        />
        <TextInput
          placeholder="Your post title"
          label="Interests"
          {...form.getInputProps("interests", {
            type: "text"
          })}
        />
        <Textarea
          placeholder="Add comments"
          label="Bio"
          autosize
          {...form.getInputProps("bio", {
            type: "text"
          })}
        />
        <TextInput
          placeholder="Your resume"
          label="Please enter a shareable link that contains your resume (ex. Google drive)"
          {...form.getInputProps("resume", {
            type: "text"
          })}
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
