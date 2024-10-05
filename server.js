

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user_address_db',
    password: 'Rahul12#',
    port: 5432,
});

// Route to handle user registration and address submission
app.post('/register', async (req, res) => {
    const { name, address } = req.body;

    try {
        // Insert user
        const userResult = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING id', [name]);
        const userId = userResult.rows[0].id;

        // Insert address
        await pool.query('INSERT INTO addresses (user_id, address) VALUES ($1, $2)', [userId, address]);

        res.status(201).send('User registered successfully.');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

