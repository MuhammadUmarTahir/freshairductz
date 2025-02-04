const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://umarstock2:mcclane33@cluster0.h1wuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

// Mongoose Schema
const formSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

// Mongoose Model
const Form = mongoose.model("Form", formSchema);

// API Endpoint to Handle Form Submission
app.post("/submit-form", async (req, res) => {
  try {
    const { firstName, lastName, email, address, zipCode, phoneNumber } =
      req.body;

    // Create a new form entry
    const newFormEntry = new Form({
      firstName,
      lastName,
      email,
      address,
      zipCode,
      phoneNumber,
    });

    // Save to Database
    await newFormEntry.save();

    res
      .status(200)
      .json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ success: false, message: "Failed to submit form." });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
