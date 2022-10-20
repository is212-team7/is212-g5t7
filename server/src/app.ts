import config from '@lib/config';
import {
    courses,
    learningJourneys,
    roles,
    skills,
} from '@routes/index';
import * as bodyParser from 'body-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import errorhandler from 'strong-error-handler';

export const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use('/skills', skills);
app.use('/roles', roles);
app.use('/courses', courses);
app.use('/learningJourneys', learningJourneys);

app.use(errors());

app.use(
    errorhandler({
        debug: !config.isProduction,
        log: true,
    })
);
