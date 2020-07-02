import { Sequelize } from "sequelize";
import { Constants } from "./constant/Constants";

const mysql = require('mysql2/promise');
class DataSQlAccess {
  static _mysqlInstance: any;

  constructor() {

  }
  // static connect(): any {
  //   if (DataSQlAccess._mysqlInstance) {
  //     return DataSQlAccess._mysqlInstance;
  //   }
  //   return new Promise<Sequelize>((resolve: any, reject: any) => {
  //     //let interval = setInterval(
  //     //  function () {
  //         mysql.createConnection({
  //           user     : Constants.DB_CONNECTION_USER,
  //           password : Constants.DB_CONNECTION_PWD
  //       }).then((connection:any) => {
  //           connection.query('CREATE DATABASE IF NOT EXISTS phonebook;').then(() => {
  //              DataSQlAccess._mysqlInstance =  new  Sequelize(Constants.DB_CONNECTION_DB_NAME,Constants.DB_CONNECTION_USER , Constants.DB_CONNECTION_PWD,Constants.sqlConnect)
  //              DataSQlAccess._mysqlInstance.authenticate().then( () => {

  //           //   clearInterval(interval);
  //              resolve(DataSQlAccess._mysqlInstance);
  //              console.log("Connected to the database 2");
  //               connection.end();
  //              }).catch( (err: any) => {
  //                console.error('Unable to connect to the database:');
  //              });
  //           })
  //       }).catch( (err: any) => {
  //         console.error('Unable to connect Database:');
  //       });
         
  //      // },  3000);
  //   });
  // }

  static connect(): Promise<any> {
   
    return new Promise<Sequelize>((resolve: any, reject: any) => {
    
     if (DataSQlAccess._mysqlInstance) {
        resolve(DataSQlAccess._mysqlInstance)
        return DataSQlAccess._mysqlInstance;
      }
          mysql.createConnection({
            user     : Constants.DB_CONNECTION_USER,
            password : Constants.DB_CONNECTION_PWD
        }).then((connection:any) => {
            connection.query('CREATE DATABASE IF NOT EXISTS phonebook;').then(() => {
               DataSQlAccess._mysqlInstance =  new  Sequelize(Constants.DB_CONNECTION_DB_NAME,Constants.DB_CONNECTION_USER , Constants.DB_CONNECTION_PWD,Constants.sqlConnect)
               DataSQlAccess._mysqlInstance.authenticate().then( () => {

                console.log('connected');
                 
            //   clearInterval(interval);
               resolve(DataSQlAccess._mysqlInstance);
                connection.end();
               }).catch( (err: any) => {
              reject('Unable to connect Database. Check access to file config/constant/Constant.ts');
               });
            }).catch( (err: any) => {
              reject('Unable to connect Database. Check access to file config/constant/Constant.ts');
             });
        }).catch( (err: any) => {
            reject('Unable to connect Database. Check access to file config/constant/Constant.ts');
        });
         
       // },  3000);
    });
  }
  
}

export = DataSQlAccess;
