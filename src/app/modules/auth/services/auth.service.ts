import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { AUTH_ENDPOINT } from 'src/app/core/enums/endpoints.enum';
import { JwtService } from 'src/app/core/services/jwt.service';
import { throwError } from 'rxjs';
import { Profile } from 'src/app/core/models/profile';
import { User } from 'src/app/core/models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser: User; 
    isLogin: boolean = false;
    
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService
    ) { }

    login(data) {
        return this.apiService.post(AUTH_ENDPOINT.LOGIN, data).pipe(
            tap(res => {                
                this.isLogin = true;                
                this.jwtService.setToken(res.data);
                this.getProfile().subscribe();
                return res;
            })
        );
    }

    logout() {        
        return this.apiService.post(AUTH_ENDPOINT.LOGOUT, {}).pipe(
            tap(res => {
                console.log(res)
                this.isLogin = false;
                this.jwtService.removeToken();
                return res
            }),
            catchError(err => {
                return throwError(err)
            })
        )        
    }

    getProfile() {
        return this.apiService.get(AUTH_ENDPOINT.PROFILE).pipe(
            map(res => {               
                this.currentUser = new User(res.data);
                return this.currentUser;
            })
        );
    }
}
