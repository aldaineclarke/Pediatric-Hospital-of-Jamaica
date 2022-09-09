import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild {

  constructor(private auth:AuthService, public router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.checkAuthenticated();
    }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.checkAuthenticated();
  }
 

  checkAuthenticated(){
    if (!this.auth.isAuthenticated()){
      if(location.href.includes("/user")){
        this.router.navigate(["/user/login"])
      }else{
        if(window.innerWidth < 480){
          alert("You should not be viewing this sytem on your mobile device");
          this.router.navigate(["/home"])
        }
        this.router.navigate(["admin/login"]);

      }
      return false;
    }
  return true;
  }
  
}

