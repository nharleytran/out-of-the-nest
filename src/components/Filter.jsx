import { Select, Button } from '@mantine/core'
import React from 'react'
import { useState } from 'react'
import * as postapi from '../api/index'

function Filter(props) {
  const { category_id, setPosts } = props
  const [sortBy, setSortBy] = useState('')
  const [outComeValue, setOutcome] = useState('')

  const handleSubmit = async () => {
    const filter = {
      categoryId: category_id,
      sortBy: sortBy,
      outcome: outComeValue,
    }
    try {
      const filteredPosts = await postapi.getPostsByFilters(filter)
      setPosts(filteredPosts)
    } catch (error) {
      console.error(error)
    }
  }

  const handleReset = async () => {
    setSortBy('')
    setOutcome('')
    try {
      const filteredPosts = await postapi.getPostsByCategory(category_id)
      setPosts(filteredPosts)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="filterfield">
      <Select
        placeholder="Date"
        searchable
        onChange={(value) => setSortBy(value)}
        value={sortBy}
        nothingFound="No options"
        data={[
          { value: 'date_desc', label: 'Latest' },
          { value: 'date_asc', label: 'Oldest' },
        ]}
      />

      <Select
        placeholder="GPA"
        searchable
        onChange={(value) => setSortBy(value)}
        value={sortBy}
        nothingFound="No options"
        data={[
          { value: 'gpa_asc', label: 'Lowest' },
          { value: 'gpa_desc', label: 'Highest' },
        ]}
      />

      <Select
        placeholder="OutCome"
        searchable
        onChange={(value) => setOutcome(value)}
        value={outComeValue}
        nothingFound="No options"
        data={['Accepted', 'Rejected', 'Waitlisted', 'Interviewed']}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={handleSubmit}>Filter</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  )
}

export default Filter
