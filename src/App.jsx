import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import NavbarComponent from "./components/Navbar";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" />
        <Route path="/create-post" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
