import dbConnect from "@/utils/dbConn";
import Product from "@/model/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// GET API - Fetch product by ID
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
        }

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}

// PATCH API - Update product by ID
export async function PATCH(req, { params }) {
    try {
        await dbConnect(); // ✅ Ensure DB connection

        const { id } = params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
        }

        const body = await req.json();
        console.log("Updating product:", id);
        console.log("Request body:", body);

        // ✅ Use correct Mongoose syntax for updating
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: body }, // Update fields
            { new: true, runValidators: true } // Return updated document
        );

        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}


// DELETE API - Delete product by ID
export async function DELETE(req, { params }) {
    try {
        await dbConnect(); //connection with db

        const { id } = params;  //get the prod id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
        }

        const deletedProduct = await Product.findByIdAndDelete(id); // check if valid id and perform delete operation

        if (!deletedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}