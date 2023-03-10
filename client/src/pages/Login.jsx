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

function Login() {

  return (
    <>
      Login Page
    </>
  );
}

export default Login;
