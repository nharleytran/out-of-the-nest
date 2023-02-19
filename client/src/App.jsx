import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostCreate from "./pages/PostCreate";
function App() {


  return (
    
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/create" element={ <PostCreate/> } />
    </Routes>
  );
}

export default App;
