import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/Home";
import Update from "./components/Update";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<Form />} />
        <Route path="/edit-post" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
