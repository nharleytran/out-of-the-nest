import { LoremIpsum } from 'lorem-ipsum'
import { Avatar } from '@mantine/core'
import {
  TextInput,
  Title,
  Textarea,
  Button,
  Group,
  Box,
  Flex,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadImage } from '../api/image_api'
import { updateUserProfile, getUser } from '../api/user_api'
import createIcon from '../images/profile.png'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

// const empty_post = {
//   name: '',
//   bio: '',
//   address: '',
//   email: '',
//   phone: '',
//   gpa: 0,
//   testscore: '',
//   resume: '',
//   extracurriculars: '',
// }
const random_post = () => {
  return {
    bio: lorem.generateParagraphs(2),
    address: lorem.generateWords(5),
    school: lorem.generateWords(5),
    interests: lorem.generateWords(5),
    resume: 'https://www.google.com',
  }
}
const dummy_generate = () => {
  return random_post()
}

const UserProfile = () => {
  const navigate = useNavigate()
  // const [image, setImage] = useState < File > (null);
  const form = useForm({
    initialValues: {
      bio: '',
      address: '',
      gpa: 0,
      testscore: '',
      resume: '',
      school: '',
      interests: '',
      profileImageId: '',
    },
  })
  const [image, setImage] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const user_id = localStorage.getItem('user_id')
      getUser(user_id).then((data) => {
        form.setValues(data)
        // console.log(data.profileImageId)
        setImage(
          `${process.env.REACT_APP_API}/image/${
            data ? data.profileImageId : ''
          }`
        )
      })
    }
    form.setValues(dummy_generate())
    fetchData()
  }, [])
  const user_id = localStorage.getItem('user_id')
  const updateFieldFunc = (updateFields) => {
    updateUserProfile(user_id, updateFields)
    navigate('/')
  }
  const handleSubmit = async (data) => {
    const fd = new FormData()
    if (file) {
      fd.append('image', file, file.name)
      uploadImage(fd).then(({ data }) => {
        localStorage.setItem('profile_image_id', data)
        form.setFieldValue('profileImageId', data)
        const updateFields = { ...form.values, profileImageId: data }
        updateFieldFunc(updateFields)
      })
    } else {
      updateFieldFunc(form.values)
    }
  }

  return (
    <div className="userprofile">
      <Box maw={800} mx="auto" className="userprofilebox">
        <Flex className="title">
          <img src={createIcon} />
          <Title order={2}>User Profile</Title>
        </Flex>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* <FileInput label="Profile Image" placeholder="Upload files" accept="image/png,image/jpeg" icon={<IconUpload size={rem(14)} />} /> */}
          <label className="mantine-1fzet7j">Profile Image</label>
          <Flex className="Upload_div" mt={1}>
            <Avatar radius="md" size={160} src={image} />
            <input
              type="file"
              className="Upload__Input"
              onChange={(event) => {
                const file = event.target.files[0]
                const url = URL.createObjectURL(file)
                setFile(file)
                setImage(url)
              }}
            />
          </Flex>
          <TextInput
            placeholder="Your name"
            label="Name"
            mt={10}
            {...form.getInputProps('name', {
              type: 'text',
            })}
            withAsterisk
          />
          <TextInput
            placeholder="Your email"
            disabled
            label="Email"
            mt={10}
            {...form.getInputProps('email', {
              type: 'text',
            })}
          />
          <TextInput
            placeholder="Your address"
            label="Address"
            mt={10}
            {...form.getInputProps('address', {
              type: 'text',
            })}
          />
          <TextInput
            placeholder="Your school"
            label="School"
            mt={10}
            {...form.getInputProps('school', {
              type: 'text',
            })}
          />
          <TextInput
            placeholder="Your post title"
            label="Interests"
            mt={10}
            {...form.getInputProps('interests', {
              type: 'text',
            })}
          />
          <Textarea
            placeholder="Add comments"
            label="Bio"
            autosize
            mt={10}
            {...form.getInputProps('bio', {
              type: 'text',
            })}
          />
          <TextInput
            placeholder="Your resume"
            label="Please enter a shareable link that contains your resume (ex. Google drive)"
            mt={10}
            {...form.getInputProps('resume', {
              type: 'text',
            })}
          />
          <Group position="center" mt={20}>
            <Button type="submit"> Update </Button>{' '}
            <Button onClick={() => navigate('/')}>Cancel</Button>
          </Group>{' '}
        </form>{' '}
      </Box>
    </div>
  )
}
export default UserProfile
