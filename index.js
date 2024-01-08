const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/Book-mgmt.json');

const config = require('./config'); // Import the configuration

dotenv.config();
const app = express();
const PORT = config.port;
// const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(config.mongodbUri,{
}).then(()=>{
    console.log("mongodb connection successfull");
}).catch((e)=>{
  console.log(e)
    console.log("error while connectiong server")
})


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', verifyToken, bookRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
