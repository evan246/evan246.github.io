import { Component, inject } from '@angular/core';
import { Layouts } from '../../shared/imports/layout';
import { Forms } from '../../shared/imports/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CustomValidatorsService } from '../../shared/services/custom-validators/custom-validators.service';
import { MyLibraryService } from 'sso-library';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [...Layouts, ...Forms, NzButtonModule, RouterLink],
  providers: [CustomValidatorsService, AuthService, NotificationService],

  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  customValidatorService = inject(CustomValidatorsService);
  // ssoLibrary = inject(MyLibraryService);
  subscription = new Subscription();
  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);
  successMessage: string = '';
  errorMessage: string = '';
  // email = this.ssoLibrary.getEmailFromToken();
  email = '';
  showForm = true;
  isLoading: boolean = false;

  emailAddress = '';
  password = '';
  message = inject(NotificationService);
  passwordHasLowercase = false;
  get emailPattern() {
    return this.customValidatorService.emailValidationRegex;
  }
  get passwordPattern() {
    return this.customValidatorService.passwordValidationRegex;
  }
  submitForm(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;

    const email = form.value['emailAddress'];
    this.subscription.add(
      this.authService.forgotPassword(email).subscribe({
        next: (res: any) => {
          this.router.navigate(['/auth/reset-password'], {
            queryParams: { emailAddress: email },
          });
          this.emailAddress = email;
          this.message.createNotification(
            'success',
            'Password reset otp sent to your email address'
          );
          console.log(res);
          this.showForm = false;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
