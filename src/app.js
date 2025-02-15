import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import indexRouter from "./routes";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));

app.use('/', indexRouter);

export default app;