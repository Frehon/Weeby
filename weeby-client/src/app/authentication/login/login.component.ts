import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Observable, of, throwError} from 'rxjs';
import {Errors} from '../model/errors';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../model/user';
import {AuthenticationService} from '../logic/authentication.service';
import {UserService} from '../../security/user.service';
import {ProgressBarComponent} from "../../shared/progress-bar/progress-bar.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(ProgressBarComponent, {static: false})
  progressBar: ProgressBarComponent;

  loginForm: FormGroup;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.createLoginForm();
  }

  public login(): void {
    this.loadProgressBar(50);
    this.validateForm().pipe(
      catchError((error: Observable<never>) => {
        this.toastr.error(Errors.invalidForm);
        return throwError(error);
      }))
      .subscribe(() => {
        const userData: { userNameOrEmail: string, password: string } = this.loginForm.getRawValue();

        this.authenticationService.login(userData)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              this.loadProgressBar(0);
              this.toastr.error(error.error, 'Unable to perform login.');
              return throwError(error);
            }))
          .subscribe((user: User) => {
            this.loadProgressBar(100);
            this.toastr.success('Successful login as: ' + user.name);
            this.userService.synchronizeUser(user);

            setTimeout(() => {
              this.router.navigate(['/all'])
                .catch((error: any) => this.toastr.error(Errors.redirectingError + error.message));
            }, 500);
          });
      });
  }

  public register(): void {
    this.router.navigate(['/registry'])
      .catch((error: any) => this.toastr.error(Errors.redirectingError + error.message));
  }

  private createLoginForm(): void {
    this.loginForm = new FormGroup({
      userNameOrEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  private validateForm(): Observable<boolean> {
    if (!this.loginForm.valid) {
      return throwError(Errors.invalidForm);
    }
    return of(true);
  }

  private loadProgressBar(percent: number) {
    this.progressBar.progressPercent = percent;
  }
}
