import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { MatStepperModule } from '@angular/material/stepper';
import {FormsModule} from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { LoginComponent } from './components/front-office/components/Login/Login.component';
import { RegisterComponent } from './components/front-office/components/Register/Register.component';
import { ReactiveFormsModule } from '@angular/forms';

import {AngularBotModule} from "./Components/front-office/angular-bot/angular-bot.module";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        AngularBotModule,
        ReactiveFormsModule,
      MatGridListModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatCardModule,
      MatFormFieldModule,
      MatStepperModule


    ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
