import { Router } from '@angular/router';
import { Security } from 'src/app/utils/security.util';
import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CartUtil } from 'src/app/utils/cart.util';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  public user: User | undefined; 
  public amountItems: number;

  ngOnInit(): void {
    this.user = Security.getUser();
    this.amountItems = CartUtil.get().items.length;
  }

  logout() {
    Security.clear();
    this.router.navigate(['/login']);
  }
}
