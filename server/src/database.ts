import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

const username = process.env.DATABASE_USERNAME || 'root';
const password = process.env.DATABASE_PASSWORD || 'password';

export const sequelize = new Sequelize('database', username, password, {
  host: 'localhost',
  dialect: 'mysql',
});

const connection = mysql.createConnection({
  host: 'localhost', // replace with Amazon RDS host
  user: 'root',
  database: 'is212-g5t7',
});
