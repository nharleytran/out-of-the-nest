import { useState, useEffect } from "react";
import * as postapi from "../api/index";
import { hashPassword } from "../api/util/password.js";

import {
  Box,
  Input,
  Checkbox,
  Group,
  TextInput,
  Button,
  PasswordInput,
} from "@mantine/core";
import { sha256, sha224 } from "js-sha256";
import { useForm } from "@mantine/form";
import { MantineProvider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

function UserCreate() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleCreateUser = async (userFormData) => {
    try {
      const user = await postapi.createUser(userFormData);
      //Create user successfully then move to login page
      notifications.show({
        title: "Create new user successfully",
        message: "Welcome to Out of the nest",
        onClose: () => navigate("/login"),
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit(handleCreateUser)}>
          <TextInput
            placeholder="Enter your full name"
            label="Your full name"
            {...form.getInputProps("name")}
            withAsterisk
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            value="your@email.com"
            {...form.getInputProps("email")}
          />{" "}
          <PasswordInput
            placeholder="password"
            label="Password"
            {...form.getInputProps("password")}
            withAsterisk
          />
          <Group position="right" mt="md">
            <Button type="submit"> Create </Button>{" "}
            <Button type="submit"> Cancel </Button>{" "}
          </Group>{" "}
        </form>{" "}
      </Box>
    </>
  );
}

export default UserCreate;