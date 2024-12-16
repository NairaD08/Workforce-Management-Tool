// const { Sequelize } = require("sequelize");
const { Pool } = require("pg"); 

const client = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Narek",
  database: "employee_db",
  PORT: "5432",
});

// Export the sequelize instance
module.exports = client;
