// import { TestBed, async, inject } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { ContactService } from './contact.service';
// import { environment } from 'src/environments/environment';
// import { HttpClientModule } from '@angular/common/http';

// describe('ContactService', () => {
//   let postService: ContactService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientModule,
//       ],
//       providers: [
//         ContactService
//       ],
//     });

//     postService = TestBed.get(ContactService);
//     httpMock = TestBed.get(HttpTestingController);
//   });

//   it(`should fetch posts as an Observable`, async(inject([HttpTestingController, ContactService],
//     (httpClient: HttpTestingController, postService: ContactService) => {

//       const postItem = [{"id":12,"first_name":"francis","last_name":"Essam","phone":"0679420039","adresse":"kharkhovskaya ulitsa 12","email":"","createdAt":"2020-07-01T13:03:28.000Z","updatedAt":"2020-07-01T13:03:28.000Z"},{"id":14,"first_name":"francis","last_name":"Essam","phone":"0679420039de","adresse":"kharkhovskaya ulitsa 12","email":"glpopkov@gmail.com","createdAt":"2020-07-01T13:08:24.000Z","updatedAt":"2020-07-01T13:08:24.000Z"}];


//       postService.list()
//         .subscribe((posts: any) => {
//           console.log(posts);
//           expect(posts.length).toBe(3);
//         });

//       let req = httpMock.expectOne(environment.apihost+environment.contactEndpoint);
//       expect(req.request.method).toBe("GET");

//       req.flush(postItem);
//       httpMock.verify();

//     })));
// });
