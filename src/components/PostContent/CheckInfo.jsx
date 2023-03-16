import { Checkbox, Group } from '@mantine/core'

function CheckInfo(props) {
  const { postData, setPostdata } = props
  return (
    <Checkbox.Group
      defaultValue={['react']}
      label="International Student or Not"
      withAsterisk>
      <Group
        mt="xs"
        onChange={(e) => setPostdata({ ...postData, author: e.target.value })}>
        <Checkbox value="International Student" label="International Student" />
        <Checkbox value="Domestic Student" label="Domestic Student" />
      </Group>
    </Checkbox.Group>
    // <TextInput
    //   placeholder="Your author"
    //   label="Author"
    //   onChange={(e) => setPostdata({ ...postData, author: e.target.value })}
    //   withAsterisk
    // />
  )
}

export default CheckInfo
