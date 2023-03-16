// import { Button, Text, Title } from '@mantine/core';
import '../App.css'
// import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
import Search from './Search'
import Filter from './Filter'

function SearchBar(props) {
  const { query, setQuery, category_id, posts, setPosts } = props
  return (
    <div className="search-bar">
      <Search query={query} setQuery={setQuery} />
      <Filter category_id={category_id} posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default SearchBar
