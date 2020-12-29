import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {ResponseCheckUserInterface} from "../types/responseCheckUser.interface";

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  checkCurrentUser(username): Observable<any> {
    return this.http.post(environment.SOCKET_ENDPOINT + '/checkUser', username).pipe(map((response: ResponseCheckUserInterface) => {
      return response.status
    }))
  }

  getImage(img): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/photos/${img}`)
  }
}
