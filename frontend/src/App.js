import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "../src/Components/Header";
import Login from "../src/Components/Login";
import Register from "../src/Components/Register";
import Posts from "../src/Components/Posts";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
