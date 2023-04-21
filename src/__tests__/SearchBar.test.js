import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SearchBar from '../components/SearchBar'

describe('SearchBar component', () => {
  test('renders without errors', () => {
    const { container } = render(<SearchBar />)
    const searchInput = container.querySelector('.search-bar')
    expect(searchInput).toBeInTheDocument()
  })

  test('updates search query when input changes', () => {
    const setQuery = jest.fn()
    const { getByPlaceholderText } = render(<SearchBar query="" setQuery={setQuery} />)
    const searchInput = getByPlaceholderText('Look for posts')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(setQuery).toHaveBeenCalledWith('test')
  })
})
