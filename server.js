/**
 * Evidencia GA7-220501096-AA5-EV01
 * Diseño y desarrollo de servicios web - caso (Registro e Inicio de Sesión)
 * Autor: Elkin Oswaldo Ramírez Álzate
 * Programa: Análisis y Desarrollo de Software (ADSO) - SENA
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const usuariosDB = [];

app.post('/api/registro', (req, res) => {
    try {
        const { usuario, contraseña } = req.body;
        if (!usuario || !contraseña) {
            return res.status(400).json({ error: true, mensaje: "El usuario y la contraseña son obligatorios." });
        }
        const usuarioExistente = usuariosDB.find(user => user.usuario === usuario);
        if (usuarioExistente) {
            return res.status(400).json({ error: true, mensaje: "El nombre de usuario ya se encuentra registrado." });
        }
        usuariosDB.push({ usuario, contraseña });
        return res.status(201).json({ error: false, mensaje: "¡Usuario registrado exitosamente!" });
    } catch (error) {
        return res.status(500).json({ error: true, mensaje: "Error interno en el servidor." });
    }
});

app.post('/api/login', (req, res) => {
    try {
        const { usuario, contraseña } = req.body;
        if (!usuario || !contraseña) {
            return res.status(400).json({ error: true, mensaje: "Debe ingresar el usuario y la contraseña." });
        }
        const usuarioEncontrado = usuariosDB.find(
            user => user.usuario === usuario && user.contraseña === contraseña
        );
        if (!usuarioEncontrado) {
            return res.status(401).json({ error: true, mensaje: "Error en la autenticación: usuario o contraseña incorrectos." });
        }
        return res.status(200).json({ error: false, mensaje: "Autenticación satisfactoria. ¡Bienvenido al sistema!" });
    } catch (error) {
        return res.status(500).json({ error: true, mensaje: "Error interno en el servidor." });
    }
});

// Mensaje obligatorio de arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});