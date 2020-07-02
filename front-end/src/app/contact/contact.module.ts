import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import { ContactModuleService } from './contact.module.service';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import { ContactService } from '../business/services/contact.service';
import { HttpClientModule } from '@angular/common/http';
const routes = [

  {
    path: '**',
    component: ContactComponent,
    // resolve: {
    //     order: OrderModuleService
    // }
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AccordionModule,
    CardModule,
    DialogModule,
    TableModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PanelModule

  ],
  declarations: [ContactComponent,ContactListComponent],
  providers:[ ContactService,ContactModuleService]
})
export class ContactModule { }
