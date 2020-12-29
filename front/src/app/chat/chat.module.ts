import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {reducer} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {ChatEffect} from "./store/effects/chat.effect";
import {AuthGuard} from "../auth.guard";
import {ShortTextPipe} from "../pipes/shortText.pipe";

const routes = [
  {path: 'chat', component: ChatComponent, canActivate:[AuthGuard], data: {animation: 'chat'}}
]

@NgModule({
  declarations: [ChatComponent, ShortTextPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    StoreModule.forFeature('message', reducer),
    EffectsModule.forFeature([ChatEffect])
  ]
})
export class ChatModule { }
