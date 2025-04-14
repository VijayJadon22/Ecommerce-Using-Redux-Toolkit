import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../store/features/userSlice.js";
import SelectedCard from "../components/SelectedCard.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  console.log(users);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error fetching posts try again later...</h1>;
  return (
    <>
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
              padding: "10px",
            }}
          >
            <h3>Name is: {user.name}</h3>
            <p>Email is: {user.email}</p>
            <p>Age is: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Link
                onClick={() => setSelectedCard(user)}
                style={{
                  marginTop: "10px",
                  // backgroundColor: "brown",
                  color: "grey",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Check Details
              </Link>
              <Link
                to={"/edit-post"}
                state={{ user: user }}
                style={{
                  marginTop: "10px",
                  // backgroundColor: "brown",
                  color: "grey",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </Link>
              <Link
                onClick={() => dispatch(deleteUser(user.id))}
                style={{
                  marginTop: "10px",
                  // backgroundColor: "brown",
                  color: "grey",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
      {selectedCard && (
        <SelectedCard
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      )}
    </>
  );
};

export default Home;
