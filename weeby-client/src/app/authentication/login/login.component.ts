import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  login(formValues: any): void {
    if(this.loginForm.valid){
      const email = formValues['email'];
      const password = formValues['password'];
      /**
       * login logic.
       */

      const callback: Promise<boolean> = this.router.navigate(['/all']);
      callback.then(() => console.log('Redirected successfully'));
    }
  }
}
