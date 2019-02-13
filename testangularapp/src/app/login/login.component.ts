import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {NgForm} from "@angular/forms";
import {AuthService} from "../model/auth.service";
import { AlertService } from '../model/alert.service';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
    public username: string;
    public password: string;
    public errorMessage: string;
    returnUrl: string;

    constructor(private route: ActivatedRoute, private router: Router,private auth: AuthService, private alert: AlertService){}

    ngOnInit(){
        this.auth.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit(form: NgForm){
        if(form.valid){
            this.auth.authenticate(this.username,this.password)
            .subscribe(data => {
                localStorage.setItem("token",data);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alert.error(error.error);
            }
            )
        }
    }
}