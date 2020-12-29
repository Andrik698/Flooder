import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import {AuthService} from "./services/auth.service";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {GetImageEffect} from "./store/effects/getImage.effect";
import {reducer} from "./store/reducer";
import {CheckUserEffect} from "./store/effects/checkUser.effect";

const routes =[
  {path: '', component: AuthComponent, data: {animation: 'home'}}
]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([GetImageEffect, CheckUserEffect]),
  ],
  providers: [AuthService]
})
export class AuthModule { }
