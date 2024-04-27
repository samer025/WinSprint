import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";

import {FormsModule} from "@angular/forms";

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
        ReactiveFormsModule
    ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
