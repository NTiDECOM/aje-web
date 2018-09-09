import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logedIn(value) {
    this.loggedIn.next(value);
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.baseApi + 'authenticate', { username: username, password: password })
        .pipe(map((res:any) => {
            // login successful if there's a jwt token in the response
            if (res && res.id_token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username, token: res.id_token }));
                this.loggedIn.next(true);
            }
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

}
