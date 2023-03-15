import { useState, useEffect } from "react";
import * as postApi from "../api/index";
import { useNavigate } from "react-router-dom";
import { Anchor, Flex } from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import { afterReceiveAuth } from "../api/auth_util";

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
import { useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm({
    initialValues: {
      email: "user@gmail.com",
      password: "123",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const setAuth = useAuth().setIsAuth;
  const handleLogin = async (userFormData) => {
    try {
      const response = await postApi.login(userFormData);
      if (response.status === 200) {
        const user_id = response.data.user_id;
        afterReceiveAuth(response.data.user_id, response.data.token);
        const url = location.state ? location.state.from.pathname : "/";
        setAuth(true);
        notifications.show({
          title: "Login successfully",
          message: `Redirecting to ${url}`,
          autoClose: 1000,
          onClose: () => { 
            navigate(url);
          },
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
            <Button type="submit"> Sign in </Button>
            <Button
              onClick={() => {
                navigate("/");
                setAuth(false);
              }}
            >
              {" "}
              Cancel{" "}
            </Button>{" "}
          </Group>{" "}
        </form>{" "}
      </Box>{" "}
    </>
  );
}

export default Login;
