import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import * as _ from 'underscore';
import { ContactComponent } from './contact.component';
import { ContactService } from '../business/services/contact.service';
import { IContact } from '../business/interfaces/IContact';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ContactModuleService } from './contact.module.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let spy = jasmine.createSpy();
  let contactService:ContactService;
  let contact =  ({
    first_name: "Essam",
    last_name: "Francis",
    phone: "+798044578560",
    adresse: "Ulitsa ulianova , 67A",
    email: "francismvom@gmail.com"
} as IContact) ;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        AccordionModule,
        CardModule,
        DialogModule,
        TableModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        PanelModule
      ],
      providers:[ContactService,ContactModuleService],
      declarations: [ ContactComponent,ContactListComponent],


    })
    .compileComponents();

    contactService = TestBed.get(ContactService); ``
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  });

    it('should create contact if this phone not yet used ',  async done => {
       await contactService.create(contact).subscribe(data =>{
        console.log('create','test');
          expect(_.has(data,'createdAt')).toBeTruthy();
             expect(_.has(data,'updatedAt')).toBeTruthy();
             contact =  data;
          done()
        },wrong=>{
          expect(1).toBe(0,wrong.error);
        })

      })
      it('should edit contact ', async  done => {

        contact.first_name =  'Kvanda tech';

        await contactService.update(contact).subscribe(data =>{
          console.log('update','test');
          console.log(data);

          if(data){
            expect(contact.updatedAt).not.toEqual(data.updatedAt);
            contact =  data;
            done()
          }else{
          expect(1).toBe(0,'Contact not updated');
          }
         },wrong=>{
           console.log(wrong.error);

          expect(1).toBe(0,wrong.error);
         })
       })

  it('should get contact', async done => {
   await component.getService().read(`${contact.id}`).then(data =>{
    console.log('get','test');
        if(data){
           expect(contact.id).toBe(data.id);
        contact =  data;
        done()
        }  else{
        expect(1).toBe(0,'Contact not exist ');
        }

      }).catch(wrong=>{
        expect(1).toBe(0,wrong.error);
    })
    })

  it('should search contact by name', async done => {
     await component.getService().search('kv').then(data =>{
      console.log('search1','test');
        expect(data.length).toBeGreaterThan(0)
        done()
      }).catch(wrong=>{

        expect(1).toBe(0,wrong.error);
      })
    })

  it('should search contact by phone number', async done => {

     await component.getService().search('kv').then(data =>{
      console.log('search2','test');
        expect(data.length).toBeGreaterThan(0)
        done()
      }).catch(wrong=>{

        expect(1).toBe(0,wrong.error);
      })
    })

    it('should delete contact created before', async done => {
      await component.getService().delete(`${contact.id}`).then(data =>{
        console.log('delete','test');
        expect(data).toBe(1,'Contact not deleted');
        done();
      }).catch(wrong=>{

        expect(1).toBe(0,wrong.error);
      })
      })



  })
