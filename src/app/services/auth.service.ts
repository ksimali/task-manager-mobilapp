import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";


@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(@Inject(PLATFORM_ID) private platformId: any){}
    
    setToken(token: string, loggedUser: any){
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("authId", loggedUser.uid);
    }

    getToken(): string | null{
        return sessionStorage.getItem("authToken");
    }

    getId(): string | null{
        return sessionStorage.getItem("authId");
    }

    logout() {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authId");
    }

    isAuthenticated(): boolean{
        if(isPlatformBrowser(this.platformId)){
            return !!this.getToken();
        }
        return false;
    }
}