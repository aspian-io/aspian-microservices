import express from 'express';

const router = express.Router();

router.get('/api/users/current-user', (req, res) => {
    res.send("Hi there!");
})

export {router as currentUserRouter}