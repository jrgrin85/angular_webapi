import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RestDataSource} from "./rest.datasource";

@Injectable({providedIn: 'root'})
export class AuthService{
    
    constructor(private datasource: RestDataSource){}

    
    authenticate(username: string,password: string): Observable<any>{
        return this.datasource.login(username,password);
    }

    logout(){
        localStorage.removeItem("token");
    }
}