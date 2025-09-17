import { NgModule } from '@angular/core';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { MultiFactorAuthOptionsComponent } from './multi-factor-auth-options/multi-factor-auth-options.component';
import { MultiFactorAuthOtpComponent } from './multi-factor-auth-otp/multi-factor-auth-otp.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => LoginComponent
      },
      {
        path: 'forgot-password',
        loadComponent: () => ForgotPasswordComponent
      },
      {
        path: 'reset-password',
        loadComponent: () => PasswordResetComponent
      },
      {
        path: 'mfa-options',
        component: MultiFactorAuthOptionsComponent
      },
      {
        path: 'mfa-otp',
        component: MultiFactorAuthOtpComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
