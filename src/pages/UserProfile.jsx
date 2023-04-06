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
import { uploadImage } from '../api/image_api';
import { updateUserProfile, getUser } from '../api/user_api';

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
};

const UserProfile = () => {
  const navigate = useNavigate();
  // const [image, setImage] = useState < File > (null);
  const form = useForm({
    initialValues: {
      bio: "",
      address: "",
      gpa: 0,
      testscore: "",
      resume: "",
      school: "",
      interests: "",
      profileImageId: "",
    }
  });
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const user_id = localStorage.getItem("user_id");
      getUser(user_id).then(data => {
        form.setValues(data);
        console.log(data.profileImageId)
        setImage(`${process.env.REACT_APP_API}/image/${data.profileImageId}`);
      });
    };
    form.setValues(dummy_generate());
    fetchData();
  }, []);
  const handleSubmit = async data => {
    const user_id = localStorage.getItem("user_id");

    const fd = new FormData();
    fd.append('image', file, file.name);
    //generate random id
    uploadImage(fd).then(({ data }) => {
      console.log(data);
      form.setFieldValue("profileImageId", data)
      const updateFields = { ...form.values, profileImageId: data };
      updateUserProfile(user_id, updateFields);
      navigate("/");
    });

  };

  return (
    <Box maw={500} mx="auto">
      <Title order={2}>User Profile</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Avatar radius="md" size={200} src={image} />
        {/* <FileInput label="Profile Image" placeholder="Upload files" accept="image/png,image/jpeg" icon={<IconUpload size={rem(14)} />} /> */}
        <input
          type="file"
          className="Upload__Input"
          onChange={(event) => {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setFile(file);
            setImage(url);
          }}
        />
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