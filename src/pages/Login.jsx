import { useState, useEffect } from 'react'
import * as postApi from '../api/index'
import { useNavigate, Link } from 'react-router-dom'
import { Anchor, Flex } from '@mantine/core'
import { useAuth } from '../context/AuthContext'
import { afterReceiveAuth } from '../api/auth_util'
import logo from '../images/outofthenestlogo.png'

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
import { MantineProvider } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useLocation } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })
  const setAuth = useAuth().setIsAuth
  const handleLogin = async (userFormData) => {
    try {
      const response = await postApi.login(userFormData)
      if (response.status === 200) {
        afterReceiveAuth(response.data);
        const url = location.state ? location.state.from.pathname : "/";
        setAuth(true);
        notifications.show({
          title: 'Login successfully',
          message: `Redirecting to Home Page`,
          autoClose: 1000,
          onClose: () => {
            // navigate(url)
            navigate("/")
          },
          loading: true,
          position: 'top-right',
        })
      }
    } catch (err) {
      notifications.show({
        id: 'hello-there',
        withCloseButton: true,
        autoClose: 5000,
        title: 'Login failed',
        message: 'Invalid email or password',
        color: 'red',
        className: 'my-notification-class',
        loading: false,
      })

      console.log(err)
    }
  }
  return (
    <div className="loginpage">
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit(handleLogin)}>
          <div className="loginlogo">
            <Link to={`/`} style={{ textDecoration: 'none' }}>
              <img src={logo} width="30%" alt="es-lint want to get" />
            </Link>
          </div>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            value="your@email.com"
            {...form.getInputProps('email')}
          />{' '}
          <PasswordInput
            placeholder="password"
            label="Password"
            value="sfdf"
            {...form.getInputProps('password')}
            withAsterisk
            mt={10}
          />
          <Flex justify="flex-start" mt={10}>
            <Anchor href="/user/create"> Create new account </Anchor>{' '}
          </Flex>{' '}
          <Group position="center" mt="md">
            <Button type="submit"> Sign in </Button>
            <Button
              onClick={() => {
                navigate('/')
                setAuth(false)
              }}>
              {' '}
              Cancel{' '}
            </Button>{' '}
          </Group>{' '}
        </form>{' '}
      </Box>{' '}
    </div>
  )
}

export default Login
