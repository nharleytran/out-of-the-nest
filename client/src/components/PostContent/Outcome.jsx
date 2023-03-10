import { Select } from '@mantine/core';
function Outcome(props) {
    const { postData, setPostdata, outcomevalue } = props;
    return (
        <Select
        label="Outcome"
        placeholder={outcomevalue}
        data={[
            { value: 'Accepted', label: 'Accepted'},
            { value: 'Waitlisted', label: 'Waitlisted'},
            { value: 'Ghosted', label: "Ghosted"},
            { value: 'Rejected', label: 'Rejected'}
        ]}
        onChange={(outcomevalue) => setPostdata({ ...postData, outcome: outcomevalue})}
        withAsterisk
        />
    )
}

export default Outcome;