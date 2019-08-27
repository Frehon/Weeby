import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Errors} from '../model/errors';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistryComponent implements OnInit {
  private registryForm: FormGroup;

  constructor(private toastr: ToastrService) {
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

    /**
     * TODO: Registry Logic after creating a registration.
     */
  }

  private comparePasswords(): void {
    const password: AbstractControl = this.registryForm.controls.password.value;
    const passwordConfirmation: AbstractControl = this.registryForm.controls.passwordConfirmation.value;
    if (password !== passwordConfirmation) {
      this.toastr.error(Errors.passwordsNotMatch);
    }
  }
}
