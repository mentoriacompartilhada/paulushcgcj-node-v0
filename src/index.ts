import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';

import { CommonRoutesConfig } from './endpoints/common.routes.config';
import { HelloHandler } from './endpoints/HelloHandler';
import { PessoaHandler } from './endpoints/PessoaHandler';
import debug from 'debug';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 8888;
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    )
};

routes.push(new HelloHandler(app));
routes.push(new PessoaHandler(app));

const runningMessage = `Server running at http://localhost:${port}`;

app.get('/health', (req: express.Request, res: express.Response) => {
    res.send(runningMessage);
});

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    // tslint:disable:no-console
    console.log(runningMessage);
});

export default server;