import { render, fireEvent } from '@testing-library/react';
import Comments from '../components/PostContent/Comments';


describe('Comments component', () => {
    test('renders the input field correctly', () => {
        const setPostdata = jest.fn();
        const { getByLabelText } = render(<Comments postData={{}} setPostdata={setPostdata}/>);
        const inputField = getByLabelText('Comments *');
        expect(inputField).toBeInTheDocument();
    });
    
    test('calls setPostdata function with correct value when comments are entered', () => {
        const setPostdata = jest.fn();
        const postData = { content: '' };

        const { getByLabelText } = render(
        <Comments postData={postData} setPostdata={setPostdata} />
        );

        const commentsField = getByLabelText('Comments *');
        fireEvent.change(commentsField, { target: { value: 'This is a comment.' } });

        expect(setPostdata).toHaveBeenCalledWith({ content: 'This is a comment.' });
    });
});
