import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl = 'api/user';

  constructor(private http: HttpClient) {
  }

  public registry(userData: { userName: string; email: string; password: string }): Observable<User> {
    const detailUrl = '/create';
    return this.http
      .post<User>(this.baseUrl + detailUrl, this.createUser(userData))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  private createUser(userData: any): User {
    const user: User = new User();
    user.name = userData.userName;
    user.email = userData.email;
    user.password = userData.password;
    return user;
  }
}
