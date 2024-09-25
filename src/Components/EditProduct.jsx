import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialProductState = {
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: "",
    sku: "",
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    reviews: [],
    returnPolicy: "",
    minimumOrderQuantity: 0,
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
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product data");
      }
    };

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

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProduct((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setProduct({ ...product, [name]: value });
    }
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
    try {
      await axios.put(`https://dummyjson.com/products/${id}`, product);
      navigate(-1);
    } catch (err) {
      setError("Failed to update product");
    }
  };

  const handleHover = () => setHover(!hover);

  const fields = [
    {
      name: "title",
      type: "text",
      placeholder: "Product Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      placeholder: "Product Description",
      required: true,
    },
    { name: "category", type: "text", placeholder: "Category", required: true },
    { name: "price", type: "number", placeholder: "Price", required: true },
    { name: "discountPercentage", type: "number", placeholder: "Discount %" },
    { name: "rating", type: "number", placeholder: "Rating" },
    { name: "stock", type: "number", placeholder: "Stock", required: true },
    { name: "brand", type: "text", placeholder: "Brand", required: true },
    { name: "sku", type: "text", placeholder: "SKU" },
    { name: "tags", type: "text", placeholder: "Tags (comma separated)" },
    { name: "weight", type: "number", placeholder: "Weight (kg)" },
    { name: "dimensions.width", type: "number", placeholder: "Width (cm)" },
    { name: "dimensions.height", type: "number", placeholder: "Height (cm)" },
    { name: "dimensions.depth", type: "number", placeholder: "Depth (cm)" },
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
    { name: "availabilityStatus", type: "text", placeholder: "Availability" },
    { name: "returnPolicy", type: "text", placeholder: "Return Policy" },
    {
      name: "minimumOrderQuantity",
      type: "number",
      placeholder: "Minimum Order Quantity",
    },
  ];

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Edit Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fields.map(({ name, type, placeholder, required }) => (
        <div key={name} style={inputContainerStyle}>
          {type === "textarea" ? (
            <textarea
              name={name}
              value={
                name.includes(".")
                  ? product[name.split(".")[0]][name.split(".")[1]]
                  : product[name]
              }
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              style={inputStyle}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={
                name.includes(".")
                  ? product[name.split(".")[0]][name.split(".")[1]]
                  : product[name]
              }
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              style={inputStyle}
            />
          )}
        </div>
      ))}

      <h3>Reviews</h3>
      {product.reviews.map((rev, index) => (
        <div key={index}>
          <p>
            <strong>{rev.reviewerName}</strong> ({rev.rating}): {rev.comment}
          </p>
        </div>
      ))}

      <div style={inputContainerStyle}>
        <input
          type="number"
          name="rating"
          value={review.rating}
          onChange={handleReviewChange}
          placeholder="Review Rating"
          required
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleReviewChange}
          placeholder="Review Comment"
          required
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <input
          type="text"
          name="reviewerName"
          value={review.reviewerName}
          onChange={handleReviewChange}
          placeholder="Reviewer Name"
          required
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <input
          type="email"
          name="reviewerEmail"
          value={review.reviewerEmail}
          onChange={handleReviewChange}
          placeholder="Reviewer Email"
          required
          style={inputStyle}
        />
      </div>
      <button
        type="button"
        onClick={handleAddReview}
        style={hover ? buttonHoverStyle : buttonStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        Add Review
      </button>

      <button
        type="submit"
        style={hover ? buttonHoverStyle : buttonStyle}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        Update Product
      </button>
    </form>
  );
};

// Styles (using inline responsive design)
const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "10px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

const inputContainerStyle = {
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: "#0056b3",
};

export default EditProduct;
