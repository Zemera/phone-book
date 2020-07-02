import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import {phoneBookContainer} from "./app/inversify.config";
import * as express from 'express';
import './controller/ContactController';
import  dbConnect = require("./config/DataSqlAcces");
import path from "path";
import Middlewares = require("./config/middlewares/MiddlewaresBase");

//dbConnect.connect();

// load everything needed to the Container
let container = phoneBookContainer;

// start the server
let server = new InversifyExpressServer(container);


server.setConfig((app) => {
  app.use(Middlewares.configuration());
  app.use(express.static(path.join(__dirname, "../public")));
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');

export  = app;
