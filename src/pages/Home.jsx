import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/features/userSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error fetching posts try again later...</h1>;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        padding: "1rem",
        rowGap: "1rem",
      }}
    >
      {users?.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid grey",
            width: "20rem",
              boxShadow: "0px 0px 5px 2px grey",
            padding:"10px"
          }}
        >
          <h3>Name is: {user.name}</h3>
          <p>Email is: {user.email}</p>
          <p>Age is: {user.age}</p>
          <p>Gender: {user.gender}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
