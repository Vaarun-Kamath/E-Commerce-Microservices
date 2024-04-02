const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

const mongo_url = process.env.MONGO_URL;
const PORT = process.env.PORT || 9001;

async function connect() {
  await mongoose
    .connect(mongo_url, {
      dbName: 'E-Commerce-Database',
    })
    .then(() => console.log('Connected to the database'))
    .catch((error) => console.error(error));
}

connect();

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('customers', customerSchema);

app.get('/', (req, res) => {
  res.send('Hello World??');
});

app.get('/checkUser', async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;
    const customerData = await User.find({ email: email });
    if (customerData.length === 0) {
      res.status(404).json({ msg: 'User not found' });
    } else if (customerData[0].password === password) {
      res.status(200).json({
        msg: {
          user_id: customerData[0]._id.toString(),
          name: customerData[0].name,
          username: customerData[0].username,
          email: customerData[0].email,
        },
      });
    } else {
      res.status(401).json({ msg: 'Password Incorrect' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/getCustomers', async (req, res) => {
  const customersData = await User.find({});
  // console.log("Database stuff: "+customersData);
  res.status(200).json({ msg: customersData });
});

app.post('/addCustomer', async (req, res) => {
  try {
    console.log(req.body);
    const { name, username, email } = req.body;
    const newCustomer = await User.create({
      name: name,
      username: username,
      email: email,
    });
    console.log('newCustomer: ', newCustomer);
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error adding customer' });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port 8080');
});
