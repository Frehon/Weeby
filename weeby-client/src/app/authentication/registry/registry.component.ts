import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Errors} from '../model/errors';
import {AuthenticationService} from '../logic/authentication.service';
import {User} from '../model/user';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Constants} from '../model/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistryComponent implements OnInit {

  private registryForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.createRegistryForm();
  }

  private createRegistryForm(): void {
    this.registryForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(Constants.emailRegexp)]),
      password: new FormControl('', [Validators.required, Validators.pattern(Constants.passwordRegexp)]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    });
  }

  public registry(): void {
    if (this.registryForm.valid) {
      this.comparePasswords();
      this.createUser();
    } else {
      this.toastr.error(Errors.invalidForm);
    }
  }

  private comparePasswords(): void {
    const passwords: { password: string, passwordConfirmation: string } = this.registryForm.getRawValue();

    if (passwords.password !== passwords.passwordConfirmation) {
      this.toastr.error(Errors.passwordsNotMatch);
    }
  }

  private createUser(): void {
    const userData: { userName: string, email: string, password: string } = this.registryForm.getRawValue();
    this.authenticationService.registry(userData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error, 'Can not create account.');
          return throwError(error);
        }))
      .subscribe((user: User) => {
        this.toastr.success('User has been created successfully! Redirecting to login page.');
        setTimeout(() => this.router.navigate(['/login'])
          .catch((error: any) => this.toastr.error(Errors.redirectingError + error.message)), 1500);
      });
  }
}
