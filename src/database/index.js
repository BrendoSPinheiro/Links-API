const { Client } = require('pg');
const databaseConfig = require('../config/database');

const client = new Client({
  host: databaseConfig.host,
  port: databaseConfig.port,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.database,
});

client.connect();

exports.query = async (query) => {
  const { rows } = await client.query(query);
  return rows;
};
