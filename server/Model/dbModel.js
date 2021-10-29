const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'skillsharedb.cetgdw4b9o0k.us-west-1.rds.amazonaws.com',
  user: 'Eevee',
  password: 'ptri3Eevee',
  connectionLimit: 5,
});
