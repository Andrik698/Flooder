import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {routerAnimations} from "./animation/my-animation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routerAnimations
  ]
})
export class AppComponent {
  title = 'Flooder';

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.animation;
  }

}
