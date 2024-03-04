import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  closeNav() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    // @ts-ignore
    navbarToggler.classList.add('collapsed');
    // @ts-ignore
    navbarCollapse.classList.remove('show');
  }
}
