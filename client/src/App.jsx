import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import PostCreate from "./pages/PostCreate";
import UserCreate from "./pages/UserCreate";
import Post from "./pages/Post";
import Edit from "./pages/Edit";
function App() {


  return (
    
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/feed" element={ <Feed/> } />
      <Route path="/create" element={ <PostCreate/> } />
      <Route path="/user/create" element={ <UserCreate/> } />
      <Route path="/feed/post" element={ <Post/> } />
      <Route path="/edit" element={ <Edit/> } />
    </Routes>
  );
}

export default App;
