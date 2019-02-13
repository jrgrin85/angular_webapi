import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RestDataSource} from "./rest.datasource";
import { Users } from "./users.model";

@Injectable({providedIn: 'root'})
export class UserService{
    constructor(private datasource: RestDataSource){}

    getUserInfo(): Users{
        let user = new Users();
        
        this.datasource.getUserInfo().subscribe(response =>
            {
                user.firstname = response.firstname;
                user.lastname = response.lastname;
                user.email = response.email;
                user.username = response.username;
            });
        return user;
    }
}