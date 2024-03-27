// Simple express server which returns working server on '/'

const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Products Server is working" });
});

app.listen(PORT, () => {
  console.log(`Prodcuts server is running on http://localhost:${PORT}`);
});
