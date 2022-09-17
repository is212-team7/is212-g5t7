import { createServer } from 'http';
import { app } from './app';
import './database';
import config from './lib/config';

(async () => {
  createServer(app).listen(config.port, () =>
    console.info(`Server running on port ${config.port}`)
  );
})();
