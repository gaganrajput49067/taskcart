import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    };

    fetchProducts();
  }, []);

  // Inline styles for the component
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease-in-out",
    },
    cardHover: {
      transform: "scale(1.05)",
    },
    cardTitle: {
      fontSize: "1.2rem",
      margin: "10px 0",
    },
    link: {
      display: "block",
      marginTop: "10px",
      color: "#007BFF",
      textDecoration: "none",
    },
    linkHover: {
      textDecoration: "underline",
    },
    img: {
      width: "100%",
      height: "auto",
      borderRadius: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Product List</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={styles.card}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={styles.img}
            />
            <h3 style={styles.cardTitle}>{product.title}</h3>
            <Link
              to={`/products/${product.id}`}
              style={styles.link}
              onMouseOver={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              View
            </Link>
            <Link
              to={`/products/${product.id}/edit`}
              style={styles.link}
              onMouseOver={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;




