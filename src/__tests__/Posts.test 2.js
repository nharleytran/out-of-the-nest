import { render } from '@testing-library/react';
import Posts from '../components/Posts';

describe('Posts component', () => {
  test('renders without crashing', () => {
    render(<Posts/>);
  });
});


