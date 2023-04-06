// import { useState, useEffect } from "react";
import * as postapi from '../api/index'

import {
  Box,
  // Input,
  // Checkbox,
  Group,
  TextInput,
  Button,
  PasswordInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
// import { MantineProvider } from "@mantine/core";
import { notifications } from '@mantine/notifications'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../images/outofthenestlogo.png'

function UserCreate() {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const handleCreateUser = async (userFormData) => {
    try {
      const user = await postapi.createUser(userFormData)
      //Create user successfully then move to login page
      if (user) {
        notifications.show({
          title: 'Create new user successfully',
          message: 'Welcome to Out of the nest',
          onClose: () => navigate('/login'),
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="loginpage">
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit(handleCreateUser)}>
          <div className="loginlogo">
            <Link to={`/`} style={{ textDecoration: 'none' }}>
              <img src={logo} width="30%" alt="es-lint want to get" />
            </Link>
          </div>
          <TextInput
            placeholder="Enter your full name"
            label="Your full name"
            {...form.getInputProps('name')}
            withAsterisk
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            value="your@email.com"
            {...form.getInputProps('email')}
            mt={10}
          />{' '}
          <PasswordInput
            placeholder="password"
            label="Password"
            {...form.getInputProps('password')}
            withAsterisk
            mt={10}
          />
          <Group position="center" mt="md">
            <Button type="submit"> Create </Button>{' '}
            <Button
              onClick={() => {
                navigate('/')
              }}>
              {' '}
              Cancel{' '}
            </Button>{' '}
          </Group>{' '}
        </form>{' '}
      </Box>
    </div>
  )
}

export default UserCreate
