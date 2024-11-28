const express = require('express');
const connection = require('./db/database');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET all athletes with pagination and search
app.get('/api/athletes', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    // First, get total count for pagination
    const countQuery = `
        SELECT COUNT(*) as total 
        FROM Athlete 
        WHERE player_name LIKE ? 
        OR player_position LIKE ? 
        OR hometown LIKE ?
    `;

    const searchPattern = `%${search}%`;

    connection.query(countQuery, [searchPattern, searchPattern, searchPattern], (err, countResults) => {
        if (err) {
            console.error('Error counting athletes:', err);
            res.status(500).json({ error: 'Error fetching athletes' });
            return;
        }

        const total = countResults[0].total;

        // Then get the actual data
        const query = `
            SELECT * 
            FROM Athlete 
            WHERE player_name LIKE ? 
            OR player_position LIKE ? 
            OR hometown LIKE ?
            LIMIT ? OFFSET ?
        `;

        connection.query(
            query, 
            [searchPattern, searchPattern, searchPattern, limit, offset],
            (err, results) => {
                if (err) {
                    console.error('Error fetching athletes:', err);
                    res.status(500).json({ error: 'Error fetching athletes' });
                    return;
                }
                res.json({
                    athletes: results,
                    total: total,
                    page: page,
                    totalPages: Math.ceil(total / limit)
                });
            }
        );
    });
});

// GET athlete by ID
app.get('/api/athletes/:id', (req, res) => {
    const query = 'SELECT * FROM Athlete WHERE player_ID = ?';
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error fetching athlete:', err);
            res.status(500).json({ error: 'Error fetching athlete' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Athlete not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Search athletes
app.get('/api/athletes/search', (req, res) => {
    const searchQuery = `%${req.query.q}%`;
    const query = `
        SELECT * FROM Athlete 
        WHERE player_name LIKE ? 
        OR position LIKE ? 
        OR hometown LIKE ?
    `;
    connection.query(query, [searchQuery, searchQuery, searchQuery], (err, results) => {
        if (err) {
            console.error('Error searching athletes:', err);
            res.status(500).json({ error: 'Error searching athletes' });
            return;
        }
        res.json(results);
    });
});

// POST new athlete
app.post('/api/athletes', (req, res) => {
    const {
        player_name, player_number, height, weight,
        age, player_position, player_year, hometown, highschool, team_ID
    } = req.body;

    const query = `
        INSERT INTO Athlete (
            player_name, player_number, height, weight,
            age, player_position, player_year, hometown, highschool, team_ID
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    connection.query(query, [
        player_name, player_number, height, weight,
        age, player_position, player_year, hometown, highschool, team_ID
    ], (err, results) => {
        if (err) {
            console.error('Error creating athlete:', err);
            res.status(500).json({ error: 'Error creating athlete' });
            return;
        }
        res.status(201).json({ id: results.insertId, message: 'Athlete created successfully' });
    });
});

// PUT update athlete
app.put('/api/athletes/:id', (req, res) => {
    const {
        player_name, player_number, height, weight,
        player_position, player_year
    } = req.body;

    const query = `
        UPDATE Athlete 
        SET player_name = ?, 
            player_number = ?, 
            height = ?, 
            weight = ?,
            player_position = ?, 
            player_year = ?
        WHERE player_ID = ?
    `;

    connection.query(query, [
        player_name,
        player_number,
        height,
        weight,
        player_position,
        player_year,
        req.params.id
    ], (err, results) => {
        if (err) {
            console.error('Error updating athlete:', err);
            res.status(500).json({ error: 'Error updating athlete' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Athlete not found' });
            return;
        }
        res.json({ 
            message: 'Athlete updated successfully',
            athlete: req.body 
        });
    });
});

// DELETE athlete
app.delete('/api/athletes/:id', (req, res) => {
    const query = 'DELETE FROM Athlete WHERE player_ID = ?';
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error deleting athlete:', err);
            res.status(500).json({ error: 'Error deleting athlete' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Athlete not found' });
            return;
        }
        res.json({ message: 'Athlete deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
