const express = require('express');
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const db = require('../db');

// Get all doubts (with user info and answers)
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`
      SELECT 
        d.*, 
        u.name as author,
        COALESCE(
          (SELECT json_agg(json_build_object(
            'id', a.id, 
            'text', a.text, 
            'createdAt', a.created_at, 
            'author', au.name
          )) 
          FROM answers a 
          JOIN users au ON a.user_id = au.id 
          WHERE a.doubt_id = d.id), 
          '[]'
        ) as answers
      FROM doubts d 
      JOIN users u ON d.user_id = u.id 
      ORDER BY d.created_at DESC
    `);

        // Map database fields to frontend interface if needed
        // Frontend expects: id, title, description, tags, author, votes, answers, createdAt
        // DB has: id, title, description, tags, author, votes, answers, created_at

        const questions = result.rows.map(row => ({
            ...row,
            createdAt: row.created_at,
            tags: row.tags || []
        }));

        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Post a doubt
router.post('/', authenticateToken, async (req, res) => {
    const { title, description, tags } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO doubts (user_id, title, description, tags) VALUES ($1, $2, $3, $4) RETURNING *, created_at as "createdAt"',
            [req.user.id, title, description, tags || []]
        );
        const newDoubt = { ...result.rows[0], author: req.user.name || 'You', answers: [] }; // Mock author name if not in token or fetch it
        // ideally we should fetch user name or return it. req.user only has id, email.

        res.status(201).json(newDoubt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add Answer
router.post('/:id/answers', authenticateToken, async (req, res) => {
    const { text } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO answers (doubt_id, user_id, text) VALUES ($1, $2, $3) RETURNING *, created_at as "createdAt"',
            [req.params.id, req.user.id, text]
        );
        // We need the author name. 
        // For now return the answer and let frontend handle or fetch name.
        // Or do a join select to return.

        const answer = result.rows[0];
        // Fetch user name
        const userRes = await db.query('SELECT name FROM users WHERE id = $1', [req.user.id]);
        answer.author = userRes.rows[0].name;

        res.json(answer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Upvote
router.post('/:id/upvote', authenticateToken, async (req, res) => {
    try {
        const result = await db.query(
            'UPDATE doubts SET votes = COALESCE(votes, 0) + 1 WHERE id = $1 RETURNING votes',
            [req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
