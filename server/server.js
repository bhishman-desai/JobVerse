/* Author: Bhishman Desai */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './config/dBConnection.js';
import apiRoutes from "./router/apiRoutes.js";

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); /* Fewer hackers know about our stack */

const port = 8080;

/* HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

/* API routes starting point */
app.use('/api', apiRoutes);

/* Start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server.')
    }
}).catch(error => {
    console.log("Invalid database connection!");
})

