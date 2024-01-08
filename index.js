const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/Book-mgmt.json');
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

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
app.get('/', (req, res) => {
  const message = "System is running fine. Test APIs";
  const htmlResponse = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Status Page</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          text-align: center;
          margin-top: 100px;
        }
        .message {
          font-size: 24px;
          color: #008000; /* Green color */
        }
      </style>
    </head>
    <body>
      <div class="message">${message}</div>
    </body>
    </html>
  `;
  res.send(htmlResponse);
});
app.use('/api/auth', authRoutes);
app.use('/api/books', verifyToken, bookRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{ customCssUrl: CSS_URL }));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
