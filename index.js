import express from 'express';
import cors from 'cors';
// import Router from './database/routes/routes.js';
import Router from './public/demo/data/routes/routes.js';

const app = express();

app.use(express.json());
app.use(cors())
app.use(Router);

app.listen(5000, () => {
    console.log("Server running...")
})
