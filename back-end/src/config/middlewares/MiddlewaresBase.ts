import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import fileupload = require('express-fileupload');


class MiddlewaresBase {
    static configuration(){
        var app = express();

        app.use(cors({origin: "*", optionsSuccessStatus: 200}));
        app.use(helmet());
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(fileupload());
        app.use(express.static(path.join(__dirname, "../../public")));
        return app;
    }
}

Object.seal(MiddlewaresBase);
export = MiddlewaresBase;
