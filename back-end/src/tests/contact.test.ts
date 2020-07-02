
import { IContactModel, IContact } from '../app/model/Contact';
import { TestFactory } from './fatory';
import { assert } from 'chai';
import { expect } from 'chai'

import DataSQlAccess from '../config/DataSqlAcces';   

let contact =  ({
    first_name: "Essam",
    last_name: "Francis",
    phone: "+798044578560",
    adresse: "Ulitsa ulianova , 67A",
    email: "francismvom@gmail.com"
} as IContact)

describe('Test Unit for phonebook App',() =>{
    
    const factory:TestFactory =  new TestFactory();
    before( () =>{
       factory.init()
    })

    after(async () =>{
        console.log('close connection');
    })

    describe('Start crud test' , () => {

        describe('' , () => {
            it(' Should Connect to database ',  done => {
                setTimeout(() => {
                    if(DataSQlAccess._mysqlInstance){
                        done();
                    }else{
                        assert(1 === (2*9),'Connection database failed')
                    }

                }, 3000);
            })
        })
       describe('' , () => {
        it('Should Create new contact', done => {
                factory.app.post('/api/v1/contact')
                .send(contact)
                .end((err, res)=>{
                    const data = res.body as IContactModel;
                    let error  =  (res.error as any);

                    assert(res.status === 200, error.text);
                    assert('createdAt' in data , 'contact not have field created_at');
                    assert('id' in data , 'contact not have field id');
                    assert(data.first_name ===  contact.first_name,'username not match');
                    assert(data.last_name ===  contact.last_name,'phone not match');
                    assert(data.phone ===  contact.phone,'phone not match');
                    assert(data.adresse ===  contact.adresse,'adresse not match');
                    assert(data.email ===  contact.email,'email not match');

                    contact  = data ;
                    
                    done()

                    
                })
        
        });
       });        
       describe('' , () => {
            it('Update contact ', done => {
                factory.app.put(`/api/v1/contact/${contact.id}`).send({
                    first_name: "kvando",
                    last_name: "tech",
                    phone: "7(900)-361-11-02",
                    adresse: "Bryansk , Duki street, 69",
                    email: "kvandotech@mail.com"
                }).end((err, res)=>{
                    const data = res.body ;
                    let error  =  (res.error as any);

                    assert(res.status === 200, error.text);
                   
                    assert(data.id === contact.id ,'update failed not match');
                    contact  = data ;
                    done()
                })
            })
        // })
        

        });
        describe('' , () => {
            it(`Find Contact`, done => {
                factory.app.get(`/api/v1/contact/${contact.id}`).send().end((err, res)=>{
                    const data = res.body as IContactModel;
                    let error  =  (res.error as any);
                    
                    assert(res.status === 200, error.text);
                    assert( data.id ===  contact.id,'id not match');
                    contact  = data ;
                    done()
                })
            })
        // })
        

        });   
      
        describe('' , () => {
            it('Search by name ', done => {
                factory.app.get(`/api/v1/contact/search?keyword=kv`).send().end((err, res)=>{
                    const data = res.body as IContactModel;
                    let error  =  (res.error as any);
                    assert(res.status === 200, error.text);
                    assert(Array.isArray(data),'data from server not array');
                    done()
                })
            })

        });  
           describe('' , () => {
                it('Search by phone number ', done => {
                    factory.app.get(`/api/v1/contact/search?keyword=kv`).send().end((err, res)=>{
                        const data = res.body as IContactModel;
                        let error  =  (res.error as any);
    
                        assert(res.status === 200, error.text);
                        assert(Array.isArray(data),'data from server not array');
                        done()
                    })
                })
            })
            describe('' , () => {
                it(`Delete contact `, done => {
                    factory.app.delete(`/api/v1/contact/${contact.id}`).send().end((err, res)=>{
                        const data = res.body;
                        let error  =  (res.error as any);
                        assert(res.status === 200, error.text);
                        assert(data ===  1,'result attemp for delete not macth');
                        done()
                    })
                })
            })
})

        
    
            
})


//   });
  
