import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-header">{product.title}</div>
      <div className="card-body">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="img-fluid"
        />
        <p>Price: ${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <p>Rating: {product.rating}</p>
        <p>Stock: {product.stock}</p>
        <p>Brand: {product.brand}</p>
        <p>Warranty: {product.warrantyInformation}</p>
      </div>
      <div className="card-footer">
        <Link to={`/products`} className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ViewProduct;
