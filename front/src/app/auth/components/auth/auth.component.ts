import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {getImageAction} from "../../store/actions/getImage.action";
import {checkNetwork, imageSelector, isCheckingUser, isLoading, statusSelector} from "../../store/selectors";
import {Observable, Subscription} from "rxjs";
import {ResponseImageInterface} from "../../types/responseImage.interface";
import {filter} from "rxjs/operators";
import {checkUserAction, loginUserAction} from "../../store/actions/checkName.action";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  arr1 = ['Пьяный', 'Черный', 'Сухой', 'Четкий', 'Глупый', 'Голый', 'Желтый', 'Синий', 'Мокрый', 'Крутой']
  arr2 = ['пират', 'пень', 'кот', 'дуб', 'паук', 'лом', 'конь', 'уж', 'камень', 'утюг']
  img$: Observable<ResponseImageInterface>
  imgIsLoaded: boolean = false
  isLoading$: Observable<boolean>
  isCheckingUser$: Observable<boolean>
  subscribe$: Subscription
  networkSubscriber$: Subscription
  name: string
  networkStatus$: boolean = true
  alertMessage: string = ''

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.changeUsername()
    this.changeImage()
    this.initializeValue()
  }

  initializeValue() {
    localStorage.clear()
    this.networkSubscriber$ = this.store.pipe(select(checkNetwork)).subscribe((isOnline) => {
      if (isOnline == false) {
       this.networkStatus$ = isOnline
        this.alertMessage = 'Отсутвует подключение к интернету'
      }
      if (isOnline && !this.networkStatus$) {
        this.networkStatus$ = true
        this.alertMessage = ''
        document.location.reload()
      }
    })
    this.isLoading$ = this.store.pipe(select(isLoading))
    this.isCheckingUser$ = this.store.pipe(select(isCheckingUser))
    this.img$ = this.store.pipe(select(imageSelector))
    this.subscribe$ = this.store.pipe(
      select(statusSelector),
      filter((status) => status === false))
      .subscribe((status) => {
      console.log(status)
      if (status === false) {
        this.changeUsername()
      }
    })
  }

  changeUsername() {
    let part1 = Math.floor(Math.random() * this.arr1.length);
    let part2 = Math.floor(Math.random() * this.arr2.length);
    this.name =`${this.arr1[part1]} ${this.arr2[part2]}`
    const user = {
      username: this.name
    }
    this.store.dispatch(checkUserAction({user}))
  }

  changeImage() {
    let imgId = Math.floor(Math.random() * 5000)
    this.store.dispatch(getImageAction({imgId}))
  }

  login() {
    const user = this.name
    this.store.dispatch(loginUserAction({user}))
    localStorage.setItem('username', this.name)
    this.router.navigate(['/chat'])
  }

  ngOnDestroy(): void {
    this.subscribe$.unsubscribe()
    this.networkSubscriber$.unsubscribe()
  }

  succ() {
    console.log(this.imgIsLoaded)
  }
}
