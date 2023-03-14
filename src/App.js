import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import PostCreate from "./pages/PostCreate";
import UserCreate from "./pages/UserCreate";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Edit from "./pages/Edit";
import {RequireAuth} from "./context/AuthContext";
function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
      <Route path="/feed" element={<RequireAuth> <Feed /> </RequireAuth> } />
      <Route path="/create" element={<PostCreate /> } />
      <Route path="/user/create" element={<UserCreate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed/post" element={<Post /> } />
      <Route path="/edit" element={<Edit />} />
    </Routes>
  );
}

export default App;
