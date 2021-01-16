import express from 'express';
import passport from 'passport';
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'
import path from 'path';

export default (routes) => {
    const app = express();
    /* istanbul ignore next */
    if (env === 'production' || env === 'development') {
        app.use(cors())
        app.use(compression())
        app.use(morgan('dev'))
        app.set('trust proxy', 1) // trust first proxy
    }
    app.use(cors())
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(passport.initialize());
    app.use('/api', routes);
    app.use(queryErrorHandler())
    app.use(bodyErrorHandler())
    app.use('/api/assets', express.static(path.resolve(__dirname, '../../../assets')));
    return app
}
