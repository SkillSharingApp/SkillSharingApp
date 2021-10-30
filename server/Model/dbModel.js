const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host:
    process.env.DB_HOST ||
    'skillsharedb.cetgdw4b9o0k.us-west-1.rds.amazonaws.com',
  user: process.env.DB_USER || 'Eevee',
  password: process.env.DB_PASS || 'ptri3Eevee',
  connectionLimit: 5,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection lost');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connection');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }
  if (connection) {
    connection.release();
  }

  return;
});

module.exports = {
  query : (text, params) => {
  console.log('Executing Query ', text);
  return pool.query(text, params);
  },
}
