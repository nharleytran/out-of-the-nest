import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import PostCreate from "./pages/PostCreate";
import Post from "./pages/Post";
function App() {


  return (
    
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/feed" element={ <Feed/> } />
      <Route path="/create" element={ <PostCreate/> } />
      <Route path="/feed/post" element={ <Post/> } />
    </Routes>
  );
}

export default App;
