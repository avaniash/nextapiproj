"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const { editproduct } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${editproduct}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (editproduct) fetchProduct();
  }, [editproduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${editproduct}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      // Log raw response before parsing
      const text = await response.text();
      console.log("Raw Response:", text);

      // Ensure response is valid JSON
      const responseData = text ? JSON.parse(text) : null;
      console.log("Parsed Response Data:", responseData);

      if (!response.ok) {
        console.error("API Error:", responseData);
        throw new Error("Failed to update product");
      }

      alert("Product updated successfully!");
      router.push("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
