import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const image = localStorage.getItem("image");

  const dashboardStyles = {
    container: {
      textAlign: "center",
      padding: "2rem",
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      maxWidth: "600px",
      margin: "2rem auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      fontSize: "2rem",
      color: "#333",
    },
    image: {
      borderRadius: "50%",
      width: "150px",
      height: "150px",
      objectFit: "cover",
      margin: "1rem 0",
      border: "3px solid #ddd",
    },
    actions: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "1.5rem",
    },
    btn: {
      padding: "10px 20px",
      borderRadius: "5px",
      fontSize: "16px",
      textDecoration: "none",
    },
    primary: {
      backgroundColor: "#007bff",
      color: "#fff",
    },
    success: {
      backgroundColor: "#28a745",
      color: "#fff",
    },
    info: {
      backgroundColor: "#17a2b8",
      color: "#fff",
    },
  };

  return (
    <div style={dashboardStyles.container}>
      <h1 style={dashboardStyles.header}>
        Welcome, {firstName} {lastName}!
      </h1>
      {image && (
        <img
          src={image}
          alt={`${firstName} ${lastName}`}
          style={dashboardStyles.image}
        />
      )}
      <div style={dashboardStyles.actions}>
        <Link
          to="/products"
          style={{ ...dashboardStyles.btn, ...dashboardStyles.primary }}
        >
          View Products
        </Link>
        <Link
          to="/products/new"
          style={{ ...dashboardStyles.btn, ...dashboardStyles.success }}
        >
          Add New Product
        </Link>
        <Link
          to="/products/report"
          style={{ ...dashboardStyles.btn, ...dashboardStyles.info }}
        >
          Product Summary Report
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
