import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Errors} from '../model/errors';
import {AuthenticationService} from '../logic/authentication.service';
import {User} from '../model/user';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistryComponent implements OnInit {
  private registryForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.createRegistryForm();
  }

  private createRegistryForm(): void {
    this.registryForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    });
  }

  public registry(): void {
    if (this.registryForm.valid) {
      this.comparePasswords();
    } else {
      this.toastr.error(Errors.invalidForm);
    }
    this.createUser();
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
      .subscribe((user: User) => {
        console.log('name' + user.name);
        console.log('password' + user.password);
        console.log('email' + user.email);
      });
  }
}
