import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductReport = () => {
  const [reportData, setReportData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [newlyAddedCount, setNewlyAddedCount] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      setTotalProducts(response.data.total);
    };

    fetchTotalProducts();

    const fetchLocalProducts = () => {
      const localProducts = JSON.parse(localStorage.getItem("products")) || [];
      setNewlyAddedCount(localProducts.length);
      setReportData(localProducts);
    };

    fetchLocalProducts();
  }, []);

  const styles = {
    container: {
      padding: "2rem",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      margin: "2rem auto",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#fff",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      margin: "1rem 0",
    },
    list: {
      listStyleType: "none",
      padding: "0",
      textAlign: "left",
    },
    listItem: {
      padding: "0.5rem 0",
      borderBottom: "1px solid #eee",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Product Summary Report</h2>
      <div className="report-cards">
        <div style={styles.card}>
          <h3>Newly Added Products Count</h3>
          <p>{newlyAddedCount}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Existing Products</h3>
          <p>{totalProducts}</p>
        </div>
      </div>
      <h3>Recently Added Products</h3>
      <ul style={styles.list}>
        {reportData.map((item) => (
          <li key={item.id} style={styles.listItem}>
            {item.title}: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductReport;
