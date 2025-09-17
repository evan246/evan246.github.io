import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MyLibraryModule, MyLibraryService } from 'sso-library';
import { environment } from '../../environments/environment';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MyLibraryModule
  ]
})
export class AuthModule { 
  constructor(
    private ssoService: MyLibraryService
  ) {}

  ngOnInit() {
    console.log('hello')
    // this.ssoService.initializeApp({
    //   params: this.encriptCredentials
    // })
    // .subscribe({
    //   next: (res) => {
    //     console.log(res)
    //   }
    // })
  }

  get encriptCredentials() {
    const data = btoa(JSON.stringify(environment.appDetails));

    return data
  }
}
