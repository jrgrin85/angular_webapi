import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Users } from '../model/users.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../model/auth.service';
import { AlertService } from '../model/alert.service';
import { UserService } from '../model/user.service';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit{ 
   
    private user: Users;

    constructor(private route: ActivatedRoute, private router: Router,private auth: AuthService, private alert: AlertService,private userService: UserService){}

    ngOnInit(){
        this.user = new Users();
        this.user = this.userService.getUserInfo();
    }

    get User(): Users{
        return this.user;
    }
}