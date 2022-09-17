import config from '@lib/config';
import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';

const username = process.env.DATABASE_USERNAME || 'root';
const password = process.env.DATABASE_PASSWORD || 'password';

export const sequelize = new Sequelize('database', username, password, {
  host: 'localhost', // replace with Amazon RDS host
  dialect: 'mysql',
});

export const umzug = new Umzug({
  migrations: {
    glob: config.isProduction
      ? __dirname + '/migrations/*.js'
      : __dirname + '/migrations/*.ts',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;

// If you're in a development environment, you can manually migrate with `yarn migrate:{up,down}` in the `server` folder
if (config.isProduction) {
  (async () => {
    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    console.log('Checking migrations...');
    const migrations = await umzug.up();
    if (migrations.length > 0) {
      console.log('Migrations applied:');
      console.log(migrations);
    } else {
      console.log('No migrations applied.');
    }
  })();
}
