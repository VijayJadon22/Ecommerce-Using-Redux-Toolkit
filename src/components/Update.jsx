import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../store/features/userSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    id: user.id,
  });
  console.log(formData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.age ||
      !formData.gender
    ) {
      alert("Please fill out all fields.");
      return;
    }
    dispatch(editUser(formData));
    navigate("/");
  };
  return (
    <div
      style={{
        border: "1px solid grey",
        boxShadow: "5px 5px 2px grey",
        width: "20rem",
        padding: "1rem",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter your age"
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
