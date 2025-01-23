
const express = require('express');
const router = express.Router();
const mssql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const pool = req.db;
        const result = await pool.request().query('SELECT * FROM dbo.Login');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// router.post('/', async (req, res) => {
//     const { email, password, firstname, lastname, phone, profession } = req.body;

//     if (!email || !password || !firstname || !lastname || !phone || !profession) {
//         return res.status(400).send('Todos los datos son requeridos');
//     }

//     try {
//         const pool = req.db;
//         const result = await pool.request()
//             .input('Email', mssql.VarChar, email)
//             .input('Password', mssql.VarChar, password)
//             .input('FirstName', mssql.VarChar, firstname)
//             .input('LastName', mssql.VarChar, lastname)
//             .input('Phone', mssql.VarChar, phone)
//             .input('Profession', mssql.VarChar, profession)
//             .execute('SP_CREARUSUARIO');

//         console.log('Usuario creado:', result);
//         res.json({ message: 'Usuario creado exitosamente' });
//     } catch (err) {
//         console.error('Error al ejecutar SP_CREARUSUARIO:', err.message, err.stack);
//         res.status(500).send('Error al crear el usuario');
//     }
// });

router.put('/', async (req, res) => {
    console.log('Cuerpo recibido en PUT /login:', req.body);

    const { id } = req.body;

    if (!id) {
        return res.status(400).send('El ID no puede ser null');
    }

    try {
        const pool = req.db;
        const result = await pool.request()
            .input('Id', mssql.Int, id)
            .execute('SP_SINGIN');

        console.log('Usuario logueado:', result);
        res.json({ message: 'Usuario logueado exitosamente' });
    } catch (err) {
        console.error('Error al ejecutar SP_SINGIN:', err.message, err.stack);
        res.status(500).send('Error al loguearse');
    }
});



module.exports = router;
