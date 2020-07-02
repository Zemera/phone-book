import { Component, OnInit } from '@angular/core';
import { ContactModuleService, } from './contact.module.service';
import { ContactService } from '../business/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private ContactService: ContactService ,private contactModuleService: ContactModuleService) {

   }

  ngOnInit() {
    this.contactModuleService.getContacts();
  }

  getService():ContactModuleService{
    return this.contactModuleService ;
  }
  create(item):any{
    console.log(item);

   this.ContactService.create(item).subscribe((data) => {
    console.log(data);
    return data ;


   })
  }

  getContacts(){
    this.ContactService.list()
  }
}
