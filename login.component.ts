import { Component, effect, inject, Injector } from '@angular/core';
import { Layouts } from '../../shared/imports/layout';
import { Forms } from '../../shared/imports/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgForm } from '@angular/forms';
import { CustomValidatorsService } from '../../shared/services/custom-validators/custom-validators.service';
import { MyLibraryService } from 'sso-library';
import { Router, RouterLink } from '@angular/router';
import { AuthDetails } from '../../core/interface/authDetails';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/services/user/user.service';
import { ModalService } from '../../shared/services/modal/modal.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CookiesService } from '../../shared/services/cookies/cookies.service';
import { User } from '../../core/interface/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...Layouts, ...Forms, NzIconModule, NzButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  customValidatorService = inject(CustomValidatorsService);
  ssoLibrary = inject(MyLibraryService);
  router = inject(Router);
  userService = inject(UserService);
  modalService = inject(ModalService);
  authService = inject(AuthService);
  cookieService = inject(CookiesService);
  injector = inject(Injector);

  get emailPattern() {
    return this.customValidatorService.emailValidationRegex;
  }

  login(form: NgForm) {
    const loaderRef = this.modalService.showLoaderModal();
    console.log('form.value ==>', form.value);
    (this.ssoLibrary.login(form.value) as Observable<AuthDetails>).subscribe({
      next: (res: AuthDetails) => {
        loaderRef.close();
        if (typeof res === 'object') {
          const userData = res;

          userData.data.role &&
          userData.data.role.toLowerCase().includes('super')
            ? ((userData.data.roleName = 'SuperAdmin'),
              (userData.data.role = 'SuperAdmin'))
            : null;

          this.authService.setUserDetails(userData);
          if (!userData.token) {
            this.router.navigate(['/auth/mfa-options']);
          } else if (!userData.data.role) {
            this.userService.getUserById(res.userId);
            effect(
              () => {
                const user = this.userService.userById() as User;
                if (Object.keys(user).length) {
                  this.cookieService.set('data', JSON.stringify(user));
                  console.log(userData);
                  userData.data.roleName === 'CustomerService'
                    ? this.router.navigate([
                        '/main/batch-management/batch-list-dashboard',
                      ])
                    : this.router.navigate(['/main/dashboard']);
                }
              },
              {
                injector: this.injector,
              }
            );
          } else {
            console.log('userData ==>', userData);
            userData.data.roleName === 'CustomerService'
              ? this.router.navigate([
                  '/main/batch-management/batch-list-dashboard',
                ])
              : this.router.navigate(['/main/dashboard']);
          }
        }
      },
      error: (err) => {
        loaderRef.close();
      },
    });
  }
}
