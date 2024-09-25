import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const initialProductState = {
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    weight: 0,
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    reviews: [],
    returnPolicy: "",
  };

  const [product, setProduct] = useState(initialProductState);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
    reviewerName: "",
    reviewerEmail: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(response.data);
      } catch (err) {
        setError("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleAddReview = () => {
    setProduct((prev) => ({
      ...prev,
      reviews: [...prev.reviews, review],
    }));
    setReview({
      rating: 0,
      comment: "",
      reviewerName: "",
      reviewerEmail: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      weight: parseFloat(product.weight),
    };

    try {
      const response = await axios.post(
        "https://dummyjson.com/products/add",
        payload
      );
      const newProduct = response.data;

      // Save the new product to local storage
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));

      // Redirect after adding the product
      navigate(-1);
    } catch (err) {
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headerStyle}>Add New Product</h2>
      {error && <p style={errorStyle}>{error}</p>}
      {fields.map(({ name, type, placeholder, required }) => (
        <div key={name} style={inputContainerStyle}>
          {type === "textarea" ? (
            <textarea
              name={name}
              value={product[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              style={inputStyle}
            />
          ) : name === "category" ? (
            <select
              name={name}
              value={product[name]}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select a category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={product[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              style={inputStyle}
            />
          )}
        </div>
      ))}

      <h3 style={subHeaderStyle}>Add Review</h3>
      {reviewFields.map(({ name, type, placeholder, required }) => (
        <div key={name} style={inputContainerStyle}>
          <input
            type={type}
            name={name}
            value={review[name]}
            onChange={handleReviewChange}
            placeholder={placeholder}
            required={required}
            style={inputStyle}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddReview} style={buttonStyle}>
        Add Review
      </button>

      <h4 style={subHeaderStyle}>Reviews:</h4>
      <ul>
        {product.reviews.map((rev, index) => (
          <li key={index} style={reviewItemStyle}>
            <strong>{rev.reviewerName}</strong> ({rev.rating}): {rev.comment}
          </li>
        ))}
      </ul>

      <button type="submit" style={submitButtonStyle}>
        Add Product
      </button>
    </form>
  );
};

// Responsive and Interactive Styles
const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  padding: "20px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
};

const inputContainerStyle = {
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  transition: "border-color 0.3s",
};

const inputFocusedStyle = {
  borderColor: "#007bff",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  marginBottom: "10px",
  transition: "background-color 0.3s",
};

const submitButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
};

const headerStyle = {
  textAlign: "center",
  color: "#333",
  marginBottom: "20px",
};

const subHeaderStyle = {
  textAlign: "left",
  color: "#555",
  marginBottom: "10px",
};

const reviewItemStyle = {
  marginBottom: "10px",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
};

const fields = [
  { name: "title", type: "text", placeholder: "Product Title", required: true },
  {
    name: "description",
    type: "textarea",
    placeholder: "Product Description",
    required: true,
  },
  { name: "category", type: "text", placeholder: "Category", required: true },
  {
    name: "price",
    type: "number",
    placeholder: "Product Price",
    required: true,
  },
  {
    name: "discountPercentage",
    type: "number",
    placeholder: "Discount Percentage",
  },
  { name: "rating", type: "number", placeholder: "Rating" },
  { name: "stock", type: "number", placeholder: "Stock", required: true },
  { name: "brand", type: "text", placeholder: "Brand", required: true },
  { name: "weight", type: "number", placeholder: "Weight" },
  {
    name: "warrantyInformation",
    type: "text",
    placeholder: "Warranty Information",
  },
  {
    name: "shippingInformation",
    type: "text",
    placeholder: "Shipping Information",
  },
  { name: "returnPolicy", type: "text", placeholder: "Return Policy" },
];

const reviewFields = [
  {
    name: "rating",
    type: "number",
    placeholder: "Review Rating",
    required: true,
  },
  {
    name: "comment",
    type: "text",
    placeholder: "Review Comment",
    required: true,
  },
  {
    name: "reviewerName",
    type: "text",
    placeholder: "Reviewer Name",
    required: true,
  },
  {
    name: "reviewerEmail",
    type: "email",
    placeholder: "Reviewer Email",
    required: true,
  },
];

export default AddProduct;
