const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');


const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://prajwalmj:Prajwal@123@cluster0.9wc1w.mongodb.net/tradeandparse', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
