import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Resume from '../components/PostContent/Resume';

describe('Resume component', () => {
  test('renders the input field correctly', () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(<Resume postData={{}} setPostdata={setPostdata}/>);
    const inputField = getByLabelText('Please enter a shareable link that contains your resume (ex. Google drive) *');
    expect(inputField).toBeInTheDocument();
  });

  test('calls setPostdata function with correct value when input changes', () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(<Resume postData={{}} setPostdata={setPostdata} />);
    const inputField = getByLabelText('Please enter a shareable link that contains your resume (ex. Google drive) *');
    fireEvent.change(inputField, { target: { value: 'https://example.com/resume.pdf' } });
    expect(setPostdata).toHaveBeenCalledWith({ resume: 'https://example.com/resume.pdf' });
  });
});
