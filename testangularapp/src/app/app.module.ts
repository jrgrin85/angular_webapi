import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import { routing }        from './app.routing';
import { RestDataSource } from './model/rest.datasource';
import { HttpClientModule } from "@angular/common/http";
import { AlertComponent } from './Alerts';
import {AlertService} from './model/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [RestDataSource,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
