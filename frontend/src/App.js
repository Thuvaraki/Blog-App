import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "../src/Components/Header";
import Login from "../src/Components/Login";
import Register from "../src/Components/Register";
import Posts from "../src/Components/Posts";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./Components/CreatePost";

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
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
