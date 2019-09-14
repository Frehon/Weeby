import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RegistryComponent} from './registry.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationService} from '../logic/authentication.service';
import {Errors} from '../model/errors';
import {User} from '../model/user';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('RegistryComponent', () => {

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  let component: RegistryComponent;
  let fixture: ComponentFixture<RegistryComponent>;

  let authenticationService: AuthenticationService;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistryComponent],
      imports: [FormsModule, BrowserModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule,
        MatButtonToggleModule, MatInputModule, HttpClientTestingModule, ToastrModule.forRoot(), BrowserAnimationsModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])],
      providers: [AuthenticationService]
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(RegistryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      authenticationService = TestBed.get(AuthenticationService);
      toastr = TestBed.get(ToastrService);
    });
  }));

  it('registry form should be invalid at the beginning.', async(() => {
    // given when then
    expect(component.registryForm.valid).toBeFalsy();
  }));

  it('registry form should be invalid when missing some input.', async(() => {
    // given
    fillRegistryForm(component);
    component.registryForm.controls['userName'].reset();

    // when then
    expect(component.registryForm.valid).toBeFalsy();
  }));

  it('registry form should be valid after filling all inputs correctly.', async(() => {
    // given
    fillRegistryForm(component);

    // when then
    expect(component.registryForm.valid).toBeTruthy();
  }));

  it('should call registry method after clicking register.', async(() => {
    // given
    const spy = spyOn(component, 'registry');

    // when
    fixture.debugElement.query(By.css('.registryButton')).triggerEventHandler('click', {});

    // then
    expect(spy).toHaveBeenCalled();
  }));

  it('should show toastr with invalid form error when registry form not valid.', async(() => {
    // given
    const spy = spyOn(toastr, 'error');

    fillRegistryForm(component);
    component.registryForm.controls['userName'].reset();

    // when
    component.registry();

    // then
    expect(spy).toHaveBeenCalledWith(Errors.invalidForm);
  }));

  it('should show toastr with invalid form error when passwords not match.', async(() => {
    // given
    const spy = spyOn(toastr, 'error');

    fillRegistryForm(component);
    component.registryForm.controls['passwordConfirmation'].setValue('differentPassword1');

    // when
    component.registry();

    // then
    expect(spy).toHaveBeenCalledWith(Errors.passwordsNotMatch);
  }));

  it('should call authentication service when form is filled correctly.', async(() => {
    // given
    const spy = spyOn(authenticationService, 'registry').and.returnValue(of(new User()));
    fillRegistryForm(component);

    // when
    component.registry();
    // then
    expect(spy).toHaveBeenCalled();
  }));

  it('should show toastr success when user successfully created.', async(() => {
    // given
    spyOn(authenticationService, 'registry').and.returnValue(of(new User()));
    const toastrSpy = spyOn(toastr, 'success');
    fillRegistryForm(component);

    // when
    component.registry();
    // then
    expect(toastrSpy).toHaveBeenCalled();
  }));
});

function fillRegistryForm(component: RegistryComponent) {
  component.registryForm.controls['userName'].setValue('userName');
  component.registryForm.controls['email'].setValue('email123@email123.com');
  component.registryForm.controls['password'].setValue('password123');
  component.registryForm.controls['passwordConfirmation'].setValue('password123');
}
