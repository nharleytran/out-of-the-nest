import React from 'react'
import { render } from '@testing-library/react'
import Path from '../components/Path'
import * as postApi from '../api'

describe('Path component', () => {
    test('renders without errors', () => {
      const { container } = render(<Path />)
      const pathsContainer = container.querySelector('.paths-container')
      expect(pathsContainer).toBeInTheDocument()
    })
})
  
