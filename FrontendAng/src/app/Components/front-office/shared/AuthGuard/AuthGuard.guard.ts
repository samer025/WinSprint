import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if user is logged in
    if (this.authService.isLoggedIn()) {
      return true; // Allow access
    } else {
      // If not logged in, redirect to login page and store the attempted URL for redirecting after login
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // Block access
    }
  }
}
