import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Edit from '../pages/Edit';

describe('Edit component', () => {
  test('renders Edit component', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Edit />
      </BrowserRouter>
    );
    expect(getByText('Edit Your Post')).toBeInTheDocument();
  });
  test('renders all fields', async () => {
    const { getByText } = render(
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
    );
    expect(getByText(/outcome/i)).toBeInTheDocument();
    expect(getByText(/gpa/i)).toBeInTheDocument();
    expect(getByText(/test score/i)).toBeInTheDocument();
    expect(getByText(/extracurriculars/i)).toBeInTheDocument();
    expect(getByText(/resume/i)).toBeInTheDocument();
    expect(getByText(/comments/i)).toBeInTheDocument();
  });
});
