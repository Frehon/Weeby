import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Constants} from '../model/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl = 'api/auth';

  constructor(private http: HttpClient) {
  }

  public registry(userData: { userName: string; email: string; password: string }): Observable<User> {
    const detailUrl = '/create';
    return this.authenticate(detailUrl, userData);
  }

  public login(userData: { userNameOrEmail: string, password: string }): Observable<User | HttpErrorResponse> {
    const detailUrl = '/login';
    let parsedUserData: { userName: string; email: string; password: string } = {userName: undefined, email: undefined, password: ''};
    if (userData.userNameOrEmail.match(Constants.emailRegexp)) {
      parsedUserData.email = userData.userNameOrEmail;
    } else {
      parsedUserData.userName = userData.userNameOrEmail;
    }
    parsedUserData.password = userData.password;
    return this.authenticate(detailUrl, parsedUserData);
  }

  private authenticate(detailUrl: string, userData: { userName: string; email: string; password: string }): Observable<User> {
    return this.http
      .post<User>(this.baseUrl + detailUrl, this.createUser(userData))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));
  }

  private createUser(userData: any): User {
    const user: User = new User();
    user.name = userData.userName;
    user.email = userData.email;
    user.password = userData.password;
    return user;
  }
}
