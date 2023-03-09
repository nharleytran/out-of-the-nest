import Header from "../components/Header";
import Posts from "../components/Posts";
import Search from "../components/Search";
import '../App.css';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function Feed() {
  const obj = useLocation();
  const category_id = obj.state.category_id;
  const [ query, setQuery ] = useState("");

  return (
    <div className="homepage" 
    style={{
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <Header/>
      <Search query={query} setQuery={setQuery}/>
      <Posts category_id={category_id} query={query}/>
    </div>
  );
}

export default Feed;