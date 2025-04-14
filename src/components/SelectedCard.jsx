import React from "react";

const SelectedCard = ({ selectedCard, setSelectedCard }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid grey",
          width: "20rem",
          boxShadow: "0px 0px 5px 2px grey",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Name is: {selectedCard.name}</h3>
        <p>Email is: {selectedCard.email}</p>
        <p>Age is: {selectedCard.age}</p>
        <p>Gender: {selectedCard.gender}</p>
        <button
          onClick={() => setSelectedCard(null)}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SelectedCard;
