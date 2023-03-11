import { useState, useEffect } from "react";
import * as postapi from "../api/index";
import { hashPassword } from "../api/util/password.js";
import { useNavigate } from "react-router-dom";
import { Anchor, Flex } from "@mantine/core";

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

function Login() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const handleLogin = async (userFormData) => {
    try {
        console.log(userFormData);
      const response = await postapi.login(userFormData);
        console.log(response);
//      //Create user successfully then move to login page
//      notifications.show({
//        title: "Login successfully",
//        message: "Welcome to Out of the nest",
//        onClose: () => navigate("/"),
//      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit(handleLogin)}>
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
            value="sfdf"
            {...form.getInputProps("password")}
            withAsterisk
          />
          <Flex justify="flex-end">
            <Anchor href="/user/create">Create new account</Anchor>
          </Flex>
          <Group position="right" mt="md">
            <Button type="submit"> Sign in </Button>{" "}
            <Button> Cancel </Button>{" "}
          </Group>{" "}
        </form>{" "}
      </Box>
    </>
  );
}

export default Login;
