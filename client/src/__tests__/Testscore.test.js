import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Testscore from '../components/PostContent/Testscore';

describe('Testscore component', () => {
  test('renders the input field correctly', () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(<Testscore postData={{}} setPostdata={setPostdata}/>);
    const inputField = getByLabelText('Test score *');
    expect(inputField).toBeInTheDocument();
  });

  test('calls setPostdata function with correct value when input changes', () => {
    const setPostdata = jest.fn();
    const { getByLabelText } = render(<Testscore postData={{}} setPostdata={setPostdata} />);
    const inputField = getByLabelText('Test score *');
    fireEvent.change(inputField, { target: { value: '520' } });
    expect(setPostdata).toHaveBeenCalledWith({ testscore: '520' });
  });
});