import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

import  DataSqlAcces = require("../../config/DataSqlAcces");


export interface IContact {
    id?:number
    first_name: String;
    last_name:  String;
    phone:  String;
    adresse:  String;
    email: String  ;
}

 export class IContactModel extends Model {
    public id!: number;
    public first_name!: String;
    public last_name!:  String;
    public phone:  String;
    public adresse!:  String;
    public email!: String  ;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
   }


DataSqlAcces.connect().then((sequelize:any)=>{

IContactModel.init(
    {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
           autoIncrement: true, 
           primaryKey: true
          },
        first_name: {
          type: DataTypes.STRING(255),
           allowNull: true
          },
        last_name: {type: DataTypes.STRING(255),
           allowNull: true
          },
        phone: {type: DataTypes.STRING(255), 
          allowNull: false, unique:{
          msg: ' this number phone already  used ' ,
          name: 'true',
        },
          validate:{
            notEmpty: {
              msg:'phone field is required'
            },
            notNull:true
          }},
        adresse: {
          type: DataTypes.STRING(255), 
          allowNull: true
        },
        email: {
          type: DataTypes.STRING(255),
           allowNull: true,
          },
    },
    {
      tableName: "Contact",
      sequelize: sequelize // this bit is important
    }
  );
   IContactModel.sync({ force: false,  logging: false});
})


  