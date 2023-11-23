const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(express.json());
const url = process.env.URI;
console.log(url);

const cors = require('cors'); // Import the cors middleware
app.use(cors()); 

const port = process.env.PORT || 5000;

const logRoutes = require('./routes/log');

app.use('/api', logRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
