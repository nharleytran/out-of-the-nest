import { LoremIpsum } from 'lorem-ipsum'
import {
  TextInput,
  Container,
  Title,
  Textarea,
  NumberInput,
  Checkbox,
  Button,
  Group,
  Box,
  Select,
  Radio,
  Flex,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as postapi from '../api/index'
import createIcon from '../images/create.png'

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

const empty_post = {
  title: '',
  outcome: '',
  content: '',
  author: '',
  category_id: '',
  gpa: 0,
  testscore: '',
  resume: '',
  extracurriculars: '',
  international: false,
  anonymous: false,
}
const random_post = () => {
  return {
    title: "",
    content: "",
    gpa: 3.00,
    testscore: '',
    resume: '',
    extracurriculars: null,
  }
}
const dummy_generate = () => {
  return random_post()
  // if (process.env.NODE_ENV === "development") {
  //   return random_post();
  // } else {
  //   return empty_post;
  // }
}

const PostCreate = () => {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      title: '',
      outcome: '',
      content: '',
      category_id: '',
      gpa: 0,
      testscore: '',
      resume: '',
      extracurriculars: '',
      international: false,
      anonymous: false,
    },
  })
  const [categories, setCategories] = useState([])

  const outcomeList = [
    {
      value: 'Accepted',
      label: 'Accepted',
    },
    {
      value: 'Waitlisted',
      label: 'Waitlisted',
    },
    {
      value: 'Ghosted',
      label: 'Ghosted',
    },
    {
      value: 'Rejected',
      label: 'Rejected',
    },
  ]
  useEffect(() => {
    const fetchData = async () => {
      const fetchData = await postapi.getAllCategories()
      const randomId =
        fetchData[Math.floor(Math.random() * fetchData.length)]._id
      form.setValues(dummy_generate())
      form.setFieldValue('category_id', randomId)
      setCategories(
        fetchData.map((category) => ({
          value: category._id,
          label: category.name,
        }))
      )
    }
    form.setFieldValue(
      'outcome',
      outcomeList[Math.floor(Math.random() * 4)].value
    )
    fetchData()
  }, [])
  const handleSubmit = async (data) => {
    // const data = await postapi.createPost(form.values);
    // navigate(`/post/${data._id}`);
    await postapi.createPost(data)
    navigate('/', { state: { data } })
  }

  return (
    <div className="postcreate">
      <Box maw={800} mx="auto" className="postcreatebox">
        <Flex className="title">
          <img src={createIcon} />
          <Title order={2}>Create a post</Title>
        </Flex>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            label="Select a category to submit your post to"
            value={form.values.category_id}
            placeholder="Pick one"
            data={categories}
            onChange={(categoryvalue) =>
              form.setFieldValue('category_id', categoryvalue)
            }
            withAsterisk
            mt={10}
          />
          <TextInput
            placeholder="Your post title"
            label="Post title"
            {...form.getInputProps('title', {
              type: 'text',
            })}
            withAsterisk
            mt={10}
          />
          <Select
            label="Outcome"
            value={form.values.outcome}
            data={outcomeList}
            onChange={(outcomevalue) => {
              form.setFieldValue('outcome', outcomevalue)
            }}
            withAsterisk
            mt={10}
          />
          <Textarea
            placeholder="Add comments"
            label="Comments"
            autosize
            {...form.getInputProps('content', {
              type: 'text',
            })}
            withAsterisk
            mt={10}
          />
          <NumberInput
            placeholder="Your GPA"
            label="GPA"
            precision={2}
            min={0.0}
            {...form.getInputProps('gpa', {
              type: 'number',
            })}
            step={0.01}
            withAsterisk
            mt={10}
          />
          <TextInput
            placeholder="Your test score - optional"
            label="Test score"
            {...form.getInputProps('testscore', {
              type: 'text',
            })}
            mt={10}
          />
          <TextInput
            placeholder="Your resume - optional"
            label="Please enter a shareable link that contains your resume (ex. Google drive)"
            {...form.getInputProps('resume', {
              type: 'text',
            })}
            mt={10}
          />
          <Textarea
            placeholder="Your extracurriculars"
            label="Extracurriculars"
            autosize
            {...form.getInputProps('extracurriculars', {
              type: 'text',
            })}
            withAsterisk
            mt={10}
          />
          <Checkbox
            label="I am an International Student"
            onChange={(event) => {
              form.setValues({
                ...form.values,
                international: event.currentTarget.checked,
              })
            }}
            mt={20}
          />
          <Checkbox
            label="Check to make the post anonymous"
            onChange={(event) => {
              form.setValues({
                ...form.values,
                anonymous: event.currentTarget.checked,
              })
            }}
            mt={10}
          />
          <Group position="center" mt={20}>
            <Button>Save draft</Button>
            <Button type="submit"> Post </Button>{' '}
            <Button onClick={() => navigate('/')}>Cancel</Button>
          </Group>{' '}
        </form>{' '}
      </Box>
    </div>
  )
}
export default PostCreate
