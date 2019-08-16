import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  login(): void {
    const callback: Promise<boolean> = this.router.navigate(['/all']);
    callback.then(() => console.log('Redirected successfully'));
  }
}
