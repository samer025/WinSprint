import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/front-office/components/Register/Register.component';
import { LoginComponent } from './components/front-office/components/Login/Login.component';
import { AuthGuard } from './Components/front-office/shared/AuthGuard/AuthGuard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // Redirect to register by default
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'frontOffice',
    loadChildren: () => import('./components/front-office/front-office.module').then(m => m.FrontOfficeModule),
    canActivate: [AuthGuard] // Protect frontOffice route
  },
  {
    path: 'backOffice',
    loadChildren: () => import('./components/back-office/back-office.module').then(m => m.BackOfficeModule),
    canActivate: [AuthGuard] // Protect backOffice route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
