import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Observable, throwError, of} from 'rxjs';
import {Errors} from '../model/errors';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(private router: Router, private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.createLoginForm();
  }

  private createLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public login(): void {
    this.validateForm().pipe(
      catchError((error: Observable<never>) => {
        this.toastr.error(Errors.invalidForm);
        return throwError(error);
      }))
      .subscribe(() => {
        this.router.navigate(['/all'])
          .catch((error: any) => this.toastr.error(Errors.redirectingError + error.message));
      });

    const formValues: { email: string, password: string } = this.loginForm.getRawValue();
    /**
     * TODO: Login Logic after creating a registration.
     */
  }

  public register(): void {
    this.router.navigate(['/registry'])
      .catch((error: any) => this.toastr.error(Errors.redirectingError + error.message));
  }

  private validateForm(): Observable<boolean> {
    if (!this.loginForm.valid) {
      return throwError(Errors.invalidForm);
    }
    return of(true);
  }
}
