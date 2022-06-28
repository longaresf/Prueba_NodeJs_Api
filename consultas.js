/*
CREATE DATABASE bitacora;

CREATE TABLE operaciones(
    id SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    monto VARCHAR (50) NOT NULL,
    monedaOrigen VARCHAR (14) NOT NULL,
    fechaConv DATE NOT NULL,
    monedaDestino VARCHAR (14) NOT NULL);

*/
const { Pool } = require("pg");

const pool_conexion = new Pool ({
user: "postgres",
host: "localhost",
password: "xxxxxx",
database: "bitacora",
port: 5432,
});

  async function getOperaciones() {
    try {
      const operaciones = await pool_conexion.query(`SELECT * FROM operaciones WHERE fecha_hora = '${fechaBusqueda}'`);
      return operaciones.rows;
    } catch (e) {
      return e;
    }
  }

    async function regOperaciones(monto, monedaOrigen, fechaConv, monedaDestino) {
        try {
          const result = await pool_conexion.query(
            `INSERT INTO operaciones (fecha_hora, monto, monedaOrigen, fechaConv, monedaDestino) values ('${NOW()}','${monto}','${monedaOrigen}','${fechaConv}','${monedaDestino}' ) RETURNING *`
          );
          return result.rows
        } catch (e) {
          return e;
        }
      }

module.exports = { getOperaciones, regOperaciones };

