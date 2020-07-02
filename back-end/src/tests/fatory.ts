
import express from 'express';
import { Sequelize } from 'sequelize/types';
import supertest from 'supertest';
import app  from '../index';
import DataSQlAccess from '../config/DataSqlAcces';
import sequelize from 'sequelize';


export class TestFactory {
  
    private _app: express.Application;
    private _sequelize : Sequelize ;

    public get app():supertest.SuperTest<supertest.Test>{
        return  supertest(this._app);
    }

    public dbInstance():Sequelize{
        return this._sequelize;
    }

    // init connect to databse
    public  init(): Promise<string>{
        return new Promise( (resolve , reject) =>{
         this._app =  app ;
        //  DataSQlAccess.connect().then((seq:any)=>{
            
        //     this._sequelize = seq
        //     resolve('OK');
        // }).catch(reject);
    
        })
    }
    close() {
         this._sequelize.close();
    }
}
