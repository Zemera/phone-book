
import { injectable, id } from "inversify";
import { SqlRepositoryBase } from './base/sqlRepository.base';
import { IContactModel } from '../model/Contact';
const sequelize = require('sequelize');

@injectable()
export class ContactRepository extends SqlRepositoryBase<IContactModel>{
    constructor() {
        super(IContactModel)
    }
    
    deleteMultiple(ids:[]):Promise<any>{
        return new Promise((resolve,reject)=>{

             ids.forEach(async(id,i,arr) => {
                await this.delete(id);

                if(arr.length-1 === i){
                    console.log(arr.length , i);
                    resolve()
                }

            });
            
        });
    }
    search(keyword:string):Promise<IContactModel>{
        
        const Op  =  sequelize.Op;
      
        return this._model.findAll({
            where: {
                [Op.or]: [
                    {
                        first_name: {
                            [Op.like]: `%${keyword}%`
                            }
                    },
                    {
                        last_name: {
                        [Op.like]: `%${keyword}%`
                        }
                    },
                    {
                        phone: {
                        [Op.like]: `%${keyword}%`
                        }
                    }
                    
                ]
            }
          });
    }
}