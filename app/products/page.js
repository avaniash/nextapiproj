"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    async function fetchProducts() {
      try {
        const response = await fetch("http://192.168.1.18:3000/api/products");
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products:", data.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (!isClient) return null; // Prevent SSR until component is mounted

  return (
    <div>
      <h1>Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
        {products.length > 0 ? (
          products.map((product, index) => {
            console.log("Rendering Product:", product); // Debugging
            return (
              <tr key={product._id || index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <button type="button" onClick={() => router.push(`/products/${product._id}`)}>
                    Edit
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>No products found</td>
          </tr>
        )}
      </tbody>
        </table>
      )}
    </div>
  );
}