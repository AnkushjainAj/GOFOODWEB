const express = require('express');
const mongoDB = require("./db");

const app = express();
const port =process.env.PORT || 5001;

// Initialize the MongoDB connection
mongoDB();

// CORS Middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001"); // Make sure this matches your frontend URL
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Body parser middleware to handle JSON requests
app.use(express.json());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Root route
app.get('/', (req, res) => {
    res.send("Hello world aj!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
