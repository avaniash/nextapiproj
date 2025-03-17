"use client"
import { useState } from "react";
import styles from "@/app/styles/product.module.css";
export default function page() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(""); // Store error messages
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  const addProduct = async(e)=>{
    e.preventDefault(); // Prevents form submission reload
    setError(""); // Reset error before validation
    setSuccessMessage(""); // Reset success message

    // console.log(name,price,description,category);
     // Validation
     if (!name || !price || !description || !category) {
      setError("All fields are required!");
      return;
    }
    let result = await fetch("http://192.168.1.18:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, description, category }),
    });
      
    result = await result.json();
    if(result.success){
      setSuccessMessage("Product added successfully!");
    } else {
        setError("Failed to add product. " + result.error);
    }
  }
  return (
    <div>
 
      <h2 className={styles.textcenter}>Add Products</h2>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Product Name" className={styles.input} />
      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}placeholder="Enter Product Price" className={styles.input} />
      <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Product Description" className={styles.input} />
      <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter Product Category" className={styles.input} />
      {error && <p className={styles.errormsg}>{error}</p>}
      {successMessage && <p className={styles.successmsg}>{successMessage}</p>}
      <button className={styles.btn} onClick={addProduct}>Add Product</button>
    </div>
  )
}
