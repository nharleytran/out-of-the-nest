import { useState, useEffect } from "react";
import * as postapi from "../api/index";
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
      const response = await postapi.login(userFormData);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        postapi.axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        notifications.show({
          title: "Login successfully",
          message: "Redirecting to home page",
          autoClose: 1000,
          onClose: () => navigate("/"),
          loading: true,
          position: "top-right",
        });
      }
    } catch (err) {
      notifications.show({
        id: "hello-there",
        withCloseButton: true,
        autoClose: 5000,
        title: "Login failed",
        message: "Invalid email or password",
        color: "red",
        className: "my-notification-class",
        loading: false,
      });

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
            <Anchor href="/user/create"> Create new account </Anchor>{" "}
          </Flex>{" "}
          <Group position="right" mt="md">
            <Button type="submit"> Sign in </Button> <Button> Cancel </Button>{" "}
          </Group>{" "}
        </form>{" "}
      </Box>{" "}
    </>
  );
}

export default Login;
