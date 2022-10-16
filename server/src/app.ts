import config from '@lib/config';
import { roles, skills, courses, LearningJourneys, Role_Skills } from '@routes/index';
import * as bodyParser from 'body-parser';
import { errors } from 'celebrate';
import * as express from 'express';
import * as errorhandler from 'strong-error-handler';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use('/skills', skills);
app.use('/roles', roles);
app.use('/courses', courses);
app.use('/LearningJourneys', LearningJourneys);
app.use('/Role_Skills', Role_Skills);

app.use(errors());

app.use(
  errorhandler({
    debug: !config.isProduction,
    log: true,
  })
);
