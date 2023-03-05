import { render, fireEvent } from '@testing-library/react';
import Outcome from '../components/PostContent/Outcome';

describe('Outcome component', () => {

  test('renders Select component with correct props', () => {
    const setPostdata = jest.fn();
    const postData = { outcome: '' };
    const outcomevalue = '';

    const { getByLabelText } = render(
      <Outcome
        outcomevalue={outcomevalue}
        postData={postData}
        setPostdata={setPostdata}
      />
    );

    const selectField = getByLabelText('Outcome *');
    expect(selectField).toBeInTheDocument();
    expect(selectField).toHaveAttribute('placeholder', 'Pick one');
    expect(selectField).toHaveAttribute('value', '');
  });
  
});
