import { Injectable } from '@angular/core';

import {ContactService} from '../business/services/contact.service';
import { IContact } from '../business/interfaces/IContact';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ContactModuleService {
contacts: IContact[];
onContactsChanged: BehaviorSubject<any>;

onFormError: BehaviorSubject<any>;
onHttpError: BehaviorSubject<any>;

constructor(private ContactService: ContactService) {
  this.onContactsChanged = new BehaviorSubject<any>([]);
  this.onFormError = new BehaviorSubject<any>(new Boolean(false));
  this.onHttpError = new BehaviorSubject<any>(new Boolean(false));
}


getContacts(): Promise<IContact[]> {

  return new Promise((resolve, reject) => {
      this.ContactService.list().subscribe(data => {
          this.contacts = data ;
          this.onContactsChanged.next(this.contacts);
          resolve(this.contacts);
      },  error =>{
        reject(error.error);
      })
  });
}


create(item:IContact): Promise<IContact> {

  return new Promise((resolve, reject) => {
      this.ContactService.create(item).subscribe(data => {
        this.getContacts();
        resolve(data)
      }, error =>{
        this.onFormError.next(error.error);
        reject(error);
      })
  });
}

delete(id:any): Promise<any> {

  return new Promise((resolve, reject) => {
      this.ContactService.delete(id).subscribe(data => {
        this.getContacts();
        resolve(data)
      }, error => {
        this.onFormError.next(error.error);
        reject(error);
      });
  });
}

read(id:any): Promise<any> {

  return new Promise((resolve, reject) => {
      this.ContactService.read(id).subscribe(data => {
        resolve(data)
      }, error => {
        this.onFormError.next(error.error);
        reject(error);
      });
  });
}

update(item): Promise<any> {
  return new Promise((resolve, reject) => {
      this.ContactService.update(item).subscribe(data => {
        this.getContacts();
        resolve(data)
      }, error =>{
        this.onFormError.next(error.error);
        reject(error);
      });
  });
}
deleteSelected(ids:string[]): Promise<IContact[]> {
  return new Promise((resolve, reject) => {
      this.ContactService.deleteSelected(ids).subscribe(data => {
        this.getContacts();
        resolve(data);
      }, error =>{
        this.onHttpError.next(error.error);
        reject(error);
      });
  });
}

search(keyword:string): Promise<IContact[]> {

  return new Promise((resolve, reject) => {
    if(keyword.length === 0){
      this.onContactsChanged.next(this.contacts);
      resolve(this.contacts);
      return ;
    }
    this.ContactService.search(keyword).subscribe(data => {
        this.onContactsChanged.next(data);
        resolve(data)
      }, error =>{
        this.onHttpError.next(error.error);
        reject(error);
      });
  });
}
}
