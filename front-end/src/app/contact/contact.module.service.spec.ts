/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactModuleService } from './contact.module.service';
import { ContactService } from '../business/services/contact.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Contact.module', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [ContactModuleService,ContactService]
    });
  });

  it('should ...', inject([ContactModuleService], (service:ContactModuleService) => {

    expect(service).toBeTruthy();
  }));
});
