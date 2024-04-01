// Simple express server which returns working server on '/'

const cors = require("cors");
const axios = require("axios");
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

app.get('/sendRequest', async (req, res) => {
  try {
    await axios.get(`${process.env.DB_SERVER}/getCustomers`)
    .then((response) => {
      // console.log(response.data);
      res.status(200).json(response.data.msg[0]);
    })
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Products server is running on http://localhost:${PORT}`);
});
