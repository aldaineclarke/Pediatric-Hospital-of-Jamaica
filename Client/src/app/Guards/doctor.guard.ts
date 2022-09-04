import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate, CanActivateChild{
  
  constructor(private authService: AuthService, private router: Router){}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkUserRole();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkUserRole()
  }
  

  checkUserRole(){
    if(this.authService.isAuthenticated() && !(this.authService.getUser().role == "doctor")){
        this.router.navigate(["user/login"]); 
        return false;
    }else
      return true;
    
  }
  
}
