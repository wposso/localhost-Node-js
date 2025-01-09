const express = require('express');
const mssql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfigLocal = {
    user: 'sa',
    password: 'masterkey',
    server: 'ADMINSYSTEM',
    database: 'NodeJs',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

const dbConfigAzure = {
    user: 'dobleu',
    password: 'Medellin2025.',
    server: 'cloudmovile.database.windows.net',
    database: 'Node js',
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
};

const isCloud = process.env.USE_CLOUD_DB === 'true';
const dbConfig = isCloud ? dbConfigAzure : dbConfigLocal;

let dbPool;

async function connectToDatabase() {
    try {
        dbPool = await mssql.connect(dbConfig);
        console.log(`Conexión a la base de datos ${isCloud ? 'en la nube (Azure)' : 'local'} establecida`);
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
}

connectToDatabase();

app.use((req, res, next) => {
    if (!dbPool) {
        return res.status(500).send('No hay conexión a la base de datos');
    }
    req.db = dbPool;
    next();
});

const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
