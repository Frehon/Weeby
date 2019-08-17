import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Post} from '../post/post';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostRestService {

  private readonly baseUrl = 'api/post';

  constructor(private http: HttpClient) {
  }

  findAllPosts(): Observable<Post[]> {
    const detailUrl = '/all';
    return this.http
      .get<Post[]>(this.baseUrl + detailUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

}
