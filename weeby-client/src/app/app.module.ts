import {AppComponent} from './app.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import {PostComponent} from './usecase/post/post.component';
import {LoginComponent} from './authentication/login/login.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {PostRestService} from './usecase/logic/post-rest.service';
import {RegistryComponent} from './authentication/registry/registry.component';
import {ToastrModule} from 'ngx-toastr';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'all', component: PostComponent},
  {path: 'registry', component: RegistryComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    RegistryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [PostRestService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
