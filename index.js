
const express = require('express');
const mssql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// const dbConfig = {
//     user: 'sa',
//     password: 'masterkey',
//     server: 'ADMINSYSTEM',
//     database: 'NodeJs',
//     options: {
//         encrypt: false,
//         trustServerCertificate: true,
//     }
// };

const dbConfig = {
    user: 'dobleu',
    password: 'Medellin2025.',
    server: 'cloudmovile.database.windows.net',
    database: 'Node js',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    requestTimeout: 60000,
    connectionTimeout: 30000,
}

let dbPool;

mssql.connect(dbConfig)
    .then(pool => {
        dbPool = pool;
        console.log('Conexión a la base de datos establecida');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos', err);
    });

app.use((req, res, next) => {
    if (!dbPool) {
        return res.status(500).send('No hay conexión a la base de datos');
    }
    req.db = dbPool;
    next();
});

const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);

const userdata = require('./routes/userdata');
app.use('/userdata', userdata);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
