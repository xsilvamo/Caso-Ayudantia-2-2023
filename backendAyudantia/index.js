import express from "express"
import {pool} from "./db.js"
import cors from "cors"

const app = express()

app.use(cors());
app.use(express.json());

//con esto mostramos todas las reservas
app.get('/reservas', async (req, res) => {
    const [resultado] = await pool.query('SELECT * FROM reservas');
    res.send(resultado);
});

app.get('/clientes', async (req, res) => {
    const [resultado] = await pool.query('SELECT * FROM clientes');
    res.send(resultado);
});


app.get('/clientes/:rut', async (req, res) => {
    try {
        const [resultado] = await pool.query('SELECT * FROM clientes WHERE rut = ?', [req.params.rut]);

        if (resultado.length > 0) {
            res.json(resultado[0]);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado para el Rut proporcionado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos del cliente' });
    }
});

// este es nuestro read para buscar las reservas a partir del rut del cliente
app.get('/reservas/:rut', async (req, res) => {
    const [resultado] = await pool.query('SELECT * FROM reservas WHERE rut_cliente = ?', [req.params.rut]);
    res.send(resultado);
});

//peticion post para crear una reserva a partir del rut del cliente
app.post('/reservas', async (req, res) => {
    const {rut_cliente, id_estado_reserva, id_vuelo} = req.body;
    const [resultado] = await pool.query('INSERT INTO reservas (rut_cliente, id_estado_reserva, id_vuelo) VALUES (?, ?, ?)', [rut_cliente, id_estado_reserva, id_vuelo]);
    res.send(resultado);
});

//peticion para actualizar datos de un cliente
app.put('/clientes/:rut', async (req, res) => {
    const { nombre, apellido, correo, telefono } = req.body;

    const updateFields = [];
    const updateValues = [];

    if (nombre) {
        updateFields.push('nombre = ?');
        updateValues.push(nombre);
    }

    if (apellido) {
        updateFields.push('apellido = ?');
        updateValues.push(apellido);
    }

    if (correo) {
        updateFields.push('correo = ?');
        updateValues.push(correo);
    }

    if (telefono) {
        updateFields.push('telefono = ?');
        updateValues.push(telefono);
    }

    // Comprobar si hay campos para actualizar
    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
    }

    // Construir y ejecutar la consulta SQL
    const sql = `UPDATE clientes SET ${updateFields.join(', ')} WHERE rut = ?`;

    try {
        const [resultado] = await pool.query(sql, [...updateValues, req.params.rut]);
        res.json('actualizado');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

app.delete('/clientes/:rut/reservas/:id_reserva', async (req, res) => {
    try {
      const { rut, id_reserva } = req.params;
  
      const [result] = await pool.query('DELETE FROM reservas WHERE rut_cliente = ? AND id_reserva = ?', [rut, id_reserva]);
  
      if (result.affectedRows > 0) {
        res.json({ mensaje: 'Reserva cancelada correctamente' });
      } else {
        res.status(404).json({ error: 'Reserva no encontrada para el cliente proporcionado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cancelar la reserva' });
    }
  });


app.listen(3000);
console.log("Server on port", 3000);

