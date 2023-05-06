import Header from '../components/Header'
import Posts from '../components/Posts'
// import Search from "../components/Search";
import SearchBar from '../components/SearchBar'
import Personalize from "../components/Personalize"
import '../App.css'
import { useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import JobPost from '../components/JobPost'

function Feed() {
  const obj = useLocation()
  const category_id = obj.state.category_id
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState([])

  return (
    <>
      <Header />
      <div className='feed-container'>
        <SearchBar
          query={query}
          setQuery={setQuery}
          category_id={category_id}
          posts={posts}
          setPosts={setPosts}
        />
        <Personalize 
          posts={posts}
        />
        <JobPost
          category_id={category_id}
        />
        <Posts
          category_id={category_id}
          query={query}
          posts={posts}
          setPosts={setPosts}
        />
      </div>
    </>
  )
}

export default Feed
