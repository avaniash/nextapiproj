import dbConnect from "@/utils/dbConn";
import { connection, NextResponse } from "next/server";
import Product from "@/model/product"; // Import Product model
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();
    
    const products = await Product.find(); // Fetch all products
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({ success: false, error: "Database connection failed" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect(); // Ensure DB connection

    const payload = await request.json();
    if (!payload || Object.keys(payload).length === 0) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    const product = new Product(payload); 
    const result = await product.save();

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Database write error:", error);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}