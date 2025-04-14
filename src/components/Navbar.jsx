import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";

const NavbarComponent = () => {
  const { users } = useSelector((state) => state.user);
  const [filter, setFilter] = useState({
    category: "",
    searchInput: "",
  });

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Redux-CRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Nav.Link href="/">All Post : ({users?.length})</Nav.Link>
            <Nav.Link href="/create-post">Create Post</Nav.Link>
          </Nav>
          <div>
            <form onChange={handleFilterChange}>
              <label style={{ color: "white" }}>
                Male
                <input
                  type="radio"
                  value="Male"
                  name="category"
                  id="category"
                />
              </label>
              <label style={{ color: "white" }}>
                Female
                <input
                  type="radio"
                  value="Female"
                  name="category"
                  id="category"
                />
              </label>
              <label style={{ color: "white" }}>
                All
                <input
                  defaultChecked
                  type="radio"
                  value=""
                  name="category"
                  id="category"
                />
              </label>
            </form>
          </div>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              name="searchInput"
              onChange={handleFilterChange}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
