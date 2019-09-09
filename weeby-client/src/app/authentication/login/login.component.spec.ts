import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationService} from '../logic/authentication.service';
import {Errors} from '../model/errors';
import {of, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../model/user';
import {UserService} from '../../security/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authenticationService: AuthenticationService;
  let toastr: ToastrService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, BrowserModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule,
        MatButtonToggleModule, MatInputModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), BrowserAnimationsModule, NoopAnimationsModule],
      providers: [AuthenticationService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      authenticationService = TestBed.get(AuthenticationService);
      toastr = TestBed.get(ToastrService);
      userService = TestBed.get(UserService);
    });
  }));

  it('login form should be invalid at the beginning.', () => {
    // given when then
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should show toastr error when form is invalid but user clicks login.', () => {
    // given
    const spy = spyOn(toastr, 'error');
    fillLoginForm(component);
    component.loginForm.controls['userNameOrEmail'].reset();

    // when
    component.login();

    // then
    expect(spy).toHaveBeenCalledWith(Errors.invalidForm);
  });

  it('should call login method when login button clicked.', () => {
    // given
    const spy = spyOn(component, 'login');

    // when
    fixture.debugElement.query(By.css('.loginButton')).triggerEventHandler('click', {});

    // then
    expect(spy).toHaveBeenCalled();
  });

  it('should show toastr error when user not found.', () => {
    // given
    const generalLoginErrorMessage = 'Unable to perform login.';
    const errorMessage = 'User does not exists';
    const error: HttpErrorResponse = new HttpErrorResponse({error: errorMessage});
    spyOn(authenticationService, 'login').and.callFake((userData: { userNameOrEmail: string, password: string }) => {
      return throwError(error);
    });
    const toastrSpy = spyOn(toastr, 'error');
    fillLoginForm(component);

    // when
    component.login();
    // then
    expect(toastrSpy).toHaveBeenCalledWith(errorMessage, generalLoginErrorMessage);
  });

  it('should login user successfully.', () => {
    // given
    const user: User = new User();
    user.name = 'testUser';
    spyOn(toastr, 'success');
    spyOn(userService, 'synchronizeUser');
    spyOn(authenticationService, 'login').and.returnValue(of(user));
    fillLoginForm(component);

    // when
    component.login();

    // then
    expect(toastr.success).toHaveBeenCalled();
    expect(userService.synchronizeUser).toHaveBeenCalledWith(user);
  });
});

function fillLoginForm(component: LoginComponent) {
  component.loginForm.controls['userNameOrEmail'].setValue('userName');
  component.loginForm.controls['password'].setValue('password1');
}
