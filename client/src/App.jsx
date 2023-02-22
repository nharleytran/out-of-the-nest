import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import PostCreate from "./pages/PostCreate";
function App() {


  return (
    
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/feed" element={ <Feed/> } />
      <Route path="/create" element={ <PostCreate/> } />
    </Routes>
  );
}

export default App;
