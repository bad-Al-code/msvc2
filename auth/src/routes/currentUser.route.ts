import express from 'express';

import { currentUser } from '@badalcodeorg/common';

const router = express.Router();

router.get('/api/users/currentUser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
