import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactModuleService } from '../contact.module.service';
import { IContact } from 'src/app/business/interfaces/IContact';
import { ContactModel } from 'src/app/business/models/contact.model';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  onContactsSubscriber : Subscription ;
  errorSubcription : Subscription ;
  contacts:IContact[] = [];
  contact:IContact;
  cols: any[];
  selectedContacts:any[] = [];
  selectedContactsTarget:any[] = [];
  displayDialog: boolean;


  selectedContact: IContact;
  multiSelect  =  false  ;
  newContact: boolean;
  errorMsg: any;

  constructor(private contactModuleService:ContactModuleService) {

    this.cols = [

      { field: 'first_name', header: 'FullName' },
      { field: 'phone', header: 'Phone' },
      { field: 'email', header: ' Email' },
      { field: 'adresse', header: 'Adresse' },
      { field: 'handle', header: 'Handle' },
    ];
  }
  ngOnInit() {

    this.onContactsSubscriber = this.contactModuleService.onContactsChanged.subscribe((data) => {
      this.contacts =  data ;
      this.displayDialog = false;
      this.contact = ({} as IContact);

    });
    this.errorSubcription = this.contactModuleService.onFormError.subscribe((err) => {
      if(!(err instanceof Boolean ))
      this.errorMsg =  err ;
    });

  }



  showDialogToAdd() {
    this.newContact = true;
    this.contact = new ContactModel ({});
    this.displayDialog = true;
}

search(value){

  this.contactModuleService.search(value).then((data)=>{
    console.log(data);

  })

}

save() {

  this.errorMsg = '';
    if (this.newContact)
       this.contactModuleService.create(this.contact);
    else
        this.contactModuleService.update(this.contact);

    this.displayDialog ;
}

delete() {
    this.contactModuleService.delete(this.selectedContact.id);
    this.contact = null;
    this.displayDialog = false;
}

onRowSelect(event) {
    this.errorMsg = '';
    this.newContact = false;
    this.contact = event.data;
    this.displayDialog = true;
}

cloneCar(c: IContact): any {
    let contact = {};
    for (let prop in c) {
        contact[prop] =contact[prop];
    }
    return contact;
}

selectRow(event,elem){
  this.selectedContactsTarget.push(elem);
  let f = this.selectedContacts.find(id => id === event);
  if(f){
    let index = this.selectedContacts.indexOf(event);
    this.selectedContacts = this.selectedContacts.filter((val, i) => i != index);
  }else{
    this.selectedContacts.push(event);
  }
  if(this.selectedContacts.length ===0){
    this.multiSelect = false ;
    this.selectedContactsTarget.forEach(item =>{
      item.checked  =  false ;
    });
    this.selectedContactsTarget = [];
  }else{
    this.multiSelect= true;
  }
}

deleteMany(){
  this.contactModuleService.deleteSelected(this.selectedContacts).then(()=>{
  this.selectedContacts = [];
  this.multiSelect = false ;
  this.selectedContactsTarget.forEach(item =>{
    item.checked  =  false ;
  });
  this.selectedContactsTarget = [];
  })

}
cancelDelete(){
  this.selectedContacts = [];
  this.multiSelect = false ;
  this.selectedContactsTarget.forEach(item =>{
    item.checked  =  false ;
  });
  this.selectedContactsTarget = [];
}

}
