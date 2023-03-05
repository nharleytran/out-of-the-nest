import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Title from '../components/PostContent/Title';

describe('Title component', () => {
  test('renders the input field correctly', () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(<Title postData={{}} setPostdata={setPostdata}/>);
    const inputField = getByLabelText('Post title *');
    expect(inputField).toBeInTheDocument();
  });

  test('calls setPostdata function with correct value when input changes', () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(<Title postData={{}} setPostdata={setPostdata} />);
    const inputField = getByLabelText('Post title *');
    fireEvent.change(inputField, { target: { value: 'Test Title' } });
    expect(setPostdata).toHaveBeenCalledWith({ title: 'Test Title' });
  });
});