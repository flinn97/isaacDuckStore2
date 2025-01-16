const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const duckRoutes = require('./routes/duckRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/duckdb', {  
    useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error(err));

app.use('/api/ducks', duckRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
