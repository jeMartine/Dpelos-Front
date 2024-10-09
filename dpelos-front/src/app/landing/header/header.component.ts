import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logoutIcon = faRightToBracket
  constructor(
    private router: Router,
  ){}

  login(){
    this.router.navigate(['/login']);
  }

}
