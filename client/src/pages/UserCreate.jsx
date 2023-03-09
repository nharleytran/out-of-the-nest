import { useState, useEffect,} from "react";
import * as postapi from "../api/index";
import {Box,Input, Checkbox, Group, TextInput, Button, PasswordInput } from "@mantine/core";
import { sha256, sha224 } from 'js-sha256';
import { useForm } from '@mantine/form';

function UserCreate() {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
      name: '',
      password_hash: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
    const handleCreateUser = async (userFormData) => {
        try {

            await postapi.createUser(postData)
        } catch (err) {
            console.log(err)
        }
    }
    return (
     <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleCreateUser)}>
            <TextInput
                placeholder="Enter your full name"
                label="Your full name"
                withAsterisk
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
                placeholder="password"
                label="Password"
              {...form.getInputProps('password_hash')}
                withAsterisk
            />

            <Checkbox
              mt="md"
              label="I agree to sell my privacy"
              {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
    );

//    return (
//        <div>
//            <TextInput
//                placeholder="Enter your full name"
//                label="Your full name"
//                onChange={(e) => setUserdata({ ...userData, name: e.target.value})}
//                withAsterisk
//            />
//            <TextInput
//                placeholder="@email"
//                label="Email"
//                onChange={(e) => setUserdata({ ...userData, email: e.target.value})}
//                withAsterisk
//            />
//            <PasswordInput
//                placeholder="password"
//                label="Password"
//                onChange={(e) => setUserdata({ ...userData, password_hash: sha256(e.target.value)})}
//                withAsterisk
//            />
//            <Button onClick={handleCreateUser}>Create</Button>
//            <Button onClick={()=>{}}>Cancel</Button>
//        </div>
//    )
}

export default UserCreate;
