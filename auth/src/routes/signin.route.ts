import express from 'express';

const router = express.Router();

router.get('/api/users/singin', (req, res) => {
    res.send('Hello');
});

export { router as siginRouter };
