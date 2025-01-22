const express = require('express');
const router = express.Router();
const mssql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const pool = req.db;
        const result = await pool.request().query('SELECT * FROM dbo.Userdata');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
})

module.exports = router;