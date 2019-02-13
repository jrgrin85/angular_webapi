import {Injectable} from "@angular/core";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { Users } from "./users.model";
import { LoginUser } from "./loginuser.model";
import { _keyValueDiffersFactory } from "@angular/core/src/application_module";
import { map } from "rxjs/operators";

const PROTOCOL = "http";
const PORT = 53998;
const IP = "localhost";
const API = "/api/testAppWebApi";

@Injectable()
export class RestDataSource{
    auth_token: string;
    baseUrl: string;
    user: LoginUser;
    newUser: Users;
    userinfo: Users;

    constructor(private http: HttpClient){
        this.baseUrl = PROTOCOL + "://" + IP + ":" + PORT + API;
    }

    login(username: string, pass: string): Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({

            })
        };
        
        this.user = new LoginUser();
        this.user.userName = username;
        this.user.password = pass;
        return this.http.post<any>(this.baseUrl + "/login",this.user)
        .pipe(map(response =>{
            return response;
        }));
    }

    getUserInfo(): Observable<Users>{
        this.auth_token = "Bearer " + localStorage.getItem("token");
        const httpOptions = {
            headers: new HttpHeaders({
                "Authorization": this.auth_token
            })
                
        };

        return this.http.get<any>(this.baseUrl + "/getUserInfo",httpOptions)
        .pipe(map(response =>{
            this.userinfo = new Users();
            this.userinfo.username = response.username;
            this.userinfo.firstname = response.firstname;
            this.userinfo.lastname = response.lastname;
            this.userinfo.email = response.email;

            return this.userinfo;
        }));
    }
}