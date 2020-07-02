import { IContact } from '../interfaces/IContact';


export class ContactModel implements IContact {
  id?: number|string;
  first_name: string;
  last_name:  string;
  phone:  string;
  adresse:  string;
  email: string  ;
  createdAt: Date;
  updatedAt: Date;

  constructor(item?:any) {
    {
        if(item.id){
            this.id = item.id || '';
        }
        this.first_name = item.first_name || '';
        this.last_name = item.last_name || '';
        this.phone = item.phone || '';
        this.email = item.email || '';
        this.createdAt = item.createdAt || undefined ;
        this.updatedAt = item.updatedAt || undefined ;

    }
}
 }
