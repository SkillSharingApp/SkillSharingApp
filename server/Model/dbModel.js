const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host:'skillsharedb.cetgdw4b9o0k.us-west-1.rds.amazonaws.com',
  user: 'Eevee',
  password:'ptri3Eevee',
  connectionLimit: 5,
});

// pool.getConnection((err, connection) => {
//   if (err) {
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       console.error('Database connection lost');
//     }
//     if (err.code === 'ER_CON_COUNT_ERROR') {
//       console.error('Database has too many connection');
//     }
//     if (err.code === 'ECONNREFUSED') {
//       console.error('Database connection was refused');
//     }
//   }
//   if (connection) {
//     connection.release();
//   }

//   return;
// });

module.exports = {
  query : async (text, params,location) => {
  let conn 
  try{
    console.log('Executing Query ', text);
  conn= await pool.getConnection();
  console.log('connected')
  const row = await conn.query(text, params);
  console.log("row",row)
    return row;
  }catch (err){
    console.log(`${location} Error:`, e)
    throw err;
  }finally {
    if (conn) return conn.end();
    }
  }
}
