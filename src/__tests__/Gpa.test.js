import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Gpa from '../components/PostContent/Gpa';

describe('Gpa component', () => {
  it('should render input field with label "GPA"', () => {
    const { getByLabelText } = render(<Gpa />);
    const input = getByLabelText('GPA *');
    expect(input).toBeInTheDocument();
  });

  it('should update post data when input value changes', () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(<Gpa postData={{}} setPostdata={setPostdata} />);
    const input = getByLabelText('GPA *');
    const newValue = 3.75;
    fireEvent.change(input, { target: { value: newValue } });
    expect(setPostdata).toHaveBeenCalledWith({ gpa: newValue });
  });

  it('should accept only numbers with up to two decimal places', () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(<Gpa postData={{}} setPostdata={setPostdata} />);
    const input = getByLabelText('GPA *');
    fireEvent.change(input, { target: { value: '3.999' } });
    expect(input.value).toBe('4.00');
  });

  it('should convert negative numbers to zero', () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(<Gpa postData={{}} setPostdata={setPostdata} />);
    const input = getByLabelText('GPA *');
    fireEvent.change(input, { target: { value: '-3.75' } });
    expect(input.value).toBe('0.00');
  });
});
