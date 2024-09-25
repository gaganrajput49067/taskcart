import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      textAlign: "center",
    },
    title: {
      fontSize: "3rem",
      color: "#333",
    },
    subtitle: {
      fontSize: "1.5rem",
      color: "#555",
    },
    info: {
      fontSize: "1.2rem",
      color: "#777",
    },
    button: {
      marginTop: "1.5rem",
      padding: "10px 20px",
      fontSize: "1.2rem",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to My App</h1>
      <p style={styles.subtitle}>Your one-stop solution for everything!</p>
      <p style={styles.info}>Cart</p>
      <button style={styles.button} onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
};

export default Home;
