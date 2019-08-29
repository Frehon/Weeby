import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../authentication/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userBehaviourSubject: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  public currentUser: Observable<User> = this.userBehaviourSubject.asObservable();

  public synchronizeUser(user: User): void {
    this.userBehaviourSubject.next(user);
  }
}
