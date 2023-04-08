import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import PostCreate from "./pages/PostCreateVer2";
import UserCreate from "./pages/UserCreate";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Edit from "./pages/Edit";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import {RequireAuth} from "./context/AuthContext";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feed" element={<Feed /> } />
      <Route path="/create" element={<RequireAuth> <PostCreate /> </RequireAuth> } />
      <Route path="/user/create" element={<UserCreate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed/post" element={<Post /> } />
      <Route path="/edit" element={<Edit />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;
