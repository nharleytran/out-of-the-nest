import Header from "../components/Header";
import Posts from "../components/Posts";
import Search from "../components/Search";
import SearchBar from "../components/SearchBar";
import '../App.css';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function Feed() {
  const obj = useLocation();
  const category_id = obj.state.category_id;
  const [ query, setQuery ] = useState("");
  const [posts,setPosts] = useState([]);


  return (
    <>
    <Header/>
    <SearchBar query={query} setQuery={setQuery} category_id={category_id} posts = {posts} setPosts = {setPosts}/>
    <Posts category_id={category_id} query={query} posts = {posts} setPosts = {setPosts}/>
    </>
  );
}

export default Feed;
