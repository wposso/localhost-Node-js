
const express = require('express');
const router = express.Router();
const mssql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const pool = req.db;
        const result = await pool.request().query('SELECT * FROM Login');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email y contraseña son requeridos');
    }

    try {
        const pool = req.db;
        const result = await pool.request()
            .input('Email', mssql.VarChar, email)
            .input('Password', mssql.VarChar, password)
            .execute('SP_CREARUSUARIO');

        res.json({ message: 'Usuario creado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al crear el usuario');
    }
});


module.exports = router;
