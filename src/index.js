import express from 'express';
import morgan from 'morgan';
import { createPool } from 'mysql2/promise';
import {config} from 'dotenv'
config()

const app = express();
app.use(morgan('dev'));

const pool = createPool({
    // host: 'localhost',
    // port: 4000,
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    port: process.env.MYSQLDB_DOCKER_PORT,
});

pool.on("connection", () => console.log('DB Connected!'));

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.json(result[0]);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
}
);
