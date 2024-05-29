import { Route, Routes } from "react-router-dom";
import Header from "../src/Components/Header";
import Login from "../src/Components/Login";
import Register from "../src/Components/Register";
import Posts from "../src/Components/Posts";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./Components/CreatePost";
import SinglePost from "./Components/SinglePost";
import EditPost from "./Components/EditPost";

function App() {
  return (
    <>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/create" element={<CreatePost />}></Route>
          <Route path="/posts/:id" element={<SinglePost />}></Route>
          <Route path="/edit/:id" element={<EditPost />}></Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
