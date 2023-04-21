import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Box,
  ActionIcon,
  Text,
  Modal,
  Stack
} from '@mantine/core'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import logo from '../images/outofthenestlogo.png'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

function Questionnaire() {
  const location = useLocation()
  const { posts } = location.state
  const navigate = useNavigate()
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)

  const handleReset = () => {
    form.reset()
    setIsConfirmationVisible(false)
  }

  const form = useForm({
    initialValues: {
      gpa: 0,
      testscore: '',
      extracurriculars: [{ content: '', key: randomId() }],
      comments: '',
      experience: '',
    },
    validate: {
      gpa: (value) =>
        value.length < 1
          ? 'GPA is required'
          : null || value < 0
            ? 'GPA cannot be negative'
            : null,
      testscore: (value) =>
        value.length < 1 ? 'Test score is required' : null,
    },
  })
  const lastIndex = form.values.extracurriculars.length - 1

  const fields = form.values.extracurriculars.map((item, index) => (
    <Group
      key={item.key}
      mt="xs"
      sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Textarea
        label={`Extracurricular ${index + 1}`}
        placeholder="Extracurricular content here"
        sx={{ flex: 1 }}
        {...form.getInputProps(`extracurriculars.${index}.content`)}
        className="input-box"
      />
      <div>
        {index === lastIndex && (
          <ActionIcon
            color="green"
            onClick={() =>
              form.insertListItem('extracurriculars', {
                content: '',
                key: randomId(),
              })
            }>
            <AddIcon />
          </ActionIcon>
        )}
        {form.values.extracurriculars.length > 1 && (
          <ActionIcon
            color="red"
            onClick={() => form.removeListItem('extracurriculars', index)}>
            <DeleteIcon />
          </ActionIcon>
        )}
      </div>
    </Group>
  ))

  const { gpa, testscore, extracurriculars, experience, comment } = form.values

  return (
    <>
      <div className="questionnairebg"></div>
      <div className="header">
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <img src={logo} width="35%" alt="es-lint want to get" />
        </Link>
      </div>
      <div className="questionnaire">
        <Box maw={800} mx="auto" className="questionnairebox">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontWeight: 'bold' }}>Enter your information below</h2>
            <p>
              After submitting your information you will see how you compare to
              other posters here in terms of GPA, test score, and
              extracurriculars. You will also receive suggestions on how you can
              improve your profile for future job and school applications.
            </p>
          </div>
          <div className="questions">
            <form onSubmit={form.onSubmit()}>
              <div className="input-container">
                <Stack spacing="xs">
                  <NumberInput
                    placeholder="Enter your GPA"
                    label="GPA"
                    precision={2}
                    {...form.getInputProps('gpa', {
                      type: 'number',
                    })}
                    step={0.01}
                    withAsterisk
                    className="input-box"
                  />
                <TextInput
                  placeholder="Enter your test score (N/A if no test score)"
                  label="Test score"
                  {...form.getInputProps('testscore', {
                    type: 'text',
                  })}
                  withAsterisk
                  className="input-box"
                />

                <TextInput
                  placeholder="Please state your experience."
                  label="Experiences"
                  {...form.getInputProps("experience", {
                    type: "text"
                  })}
                  className="input-box"
                />
                {fields}
                <TextInput
                  placeholder="Ex: I want to get into companies like Google, Facebook, etc."
                  label="Other Comments"
                  {...form.getInputProps("comment", {
                    type: "text"
                  })}
                  className="input-box"
                />
              </Stack>
              </div>

              <div className="submit-questionnaire-button">
                <Button
                  size="md"
                  onClick={() => {
                    if (form.isValid()) {
                      navigate("/results", { state: { posts, gpa, testscore, extracurriculars, experience, comment } })
                    } else {
                      form.validate()
                    }
                  }}>
                  Submit
                </Button>
                <Button
                  size="md"
                  variant="subtle"
                  onClick={() => setIsConfirmationVisible(true)}
                  style={{ marginLeft: '5px' }}>
                  Clear form
                </Button>
              </div>

              <Modal
                opened={isConfirmationVisible}
                onClose={() => setIsConfirmationVisible(false)}
                title="Clear form?"
                size="md"
                padding="lg"
                centered>
                <Text>
                  This will remove your answers from all questions, and cannot
                  be undone.
                </Text>
                <div className="buttons">
                  <Button
                    variant="subtle"
                    color="gray"
                    onClick={() => setIsConfirmationVisible(false)}>
                    Cancel
                  </Button>
                  <Button variant="subtle" color="gray" onClick={handleReset}>
                    Clear form
                  </Button>
                </div>
              </Modal>
            </form>
          </div>
        </Box>
      </div>
    </>
  )
}

export default Questionnaire
