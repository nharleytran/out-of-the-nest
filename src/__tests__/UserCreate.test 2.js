import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import UserCreate from '../pages/UserCreate'
import * as postapi from '../api/index'

jest.mock('../api/index', () => ({
  createUser: jest.fn(),
}))

describe('UserCreate', () => {
  test('should render the form', () => {
    const { getByLabelText, getByText } = render(
    <BrowserRouter>
    <UserCreate />
    </BrowserRouter>)
    expect(getByLabelText(/Your full name/i)).toBeInTheDocument()
    expect(getByLabelText(/Email/i)).toBeInTheDocument()
    expect(getByLabelText(/Password/i)).toBeInTheDocument()
    expect(getByText(/Create/i)).toBeInTheDocument()
    expect(getByText(/Cancel/i)).toBeInTheDocument()
  })

  test('should submit the form successfully', async () => {
    postapi.createUser.mockResolvedValueOnce({ name: 'John Doe' })
    const { getByLabelText, getByText } = render(
        <BrowserRouter>
        <UserCreate />
        </BrowserRouter>)
    const nameInput = getByLabelText(/Your full name/i)
    const emailInput = getByLabelText(/Email/i)
    const passwordInput = getByLabelText(/Password/i)
    const createButton = getByText(/Create/i)
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.click(createButton)
    expect(postapi.createUser).toHaveBeenCalledTimes(1)
    expect(postapi.createUser).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    })
    // you can also test the notification message and navigation here
  })
})
