import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base/service.base';
import {environment} from '../../../environments/environment';
import { IContact } from '../interfaces/IContact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService<IContact> {

    constructor(private http: HttpClient) {
        super(http, environment.apihost, environment.contactEndpoint);
    }

    public search(keyword:string): Observable<IContact[]> {
      return this.httpClient.get(`${this.url}${this.endpoint}/search?keyword=${keyword}`).pipe(map((data: any) => {
          return data as IContact[];
      }));
    }
    public deleteSelected(ids:string[]): Observable<any> {
      return this.httpClient.post(`${this.url}${this.endpoint}/delete-selected`,{ids:ids}).pipe(map((data: any) => {
          return data as any;
      }));
    }
}
