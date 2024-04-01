const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

const mongo_url = process.env.MONGO_URL;
const PORT = process.env.PORT || 9001;

async function connect() {
  await mongoose
    .connect(mongo_url, {
      dbName: "E-Commerce-Database",
    })
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.error(error));
}

connect();

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("customers", customerSchema);

app.get("/", (req, res) => {
  res.send("Hello World??");
});

app.get("/getCustomers", async (req, res) => {
  const customersData = await User.find({});
  // console.log("Database stuff: "+customersData);
  res.status(200).json({msg: customersData});
});

app.post("/addCustomer", async (req, res) => {
  try {
    console.log(req.body);
    const { name, username, email } = req.body;
    const newCustomer = await User.create({
      name: name,
      username: username,
      email: email,
    });
    console.log("newCustomer: ", newCustomer);
    res.status(201).json({ message: "Customer added successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error adding customer" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 8080");
});
