// import 'dotenv/config';
import { createServer } from 'node:http';

import app from './app';
const PORT = process.env.PORT || 3000;

const server = createServer(app);
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
