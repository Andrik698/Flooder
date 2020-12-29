import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {
  chatInitializeAction,
  deleteMessageAction, logoutUserChatAction,
  sendMessageAction,
} from "../../store/actions/chat.action";
import {
  connectedUsersSelector, getNotificationSelector,
  isAddedUserIdSelector,
  isSendSelector,
  messagesSelector,
  userIdSelector
} from "../../store/selectors";
import {filter, map} from "rxjs/operators";
import {MessageInterface} from "../../types/message.interface";
import {combineLatest, Observable, Subscriber, Subscription} from "rxjs";
import {logoutUserAuthAction} from "../../../auth/store/actions/checkName.action";
import {authSelector, checkNetwork, imageSelector, isLoading} from "../../../auth/store/selectors";
import {ResponseImageInterface} from "../../../auth/types/responseImage.interface";
import {addUserAction} from "../../store/actions/addUser.action";
import {UserInterface} from "../../types/user.interface";
import {Router} from "@angular/router";
import {NotificationInterface} from "../../types/notification.interface";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages$: Observable<MessageInterface[]>
  isAddedUserId$: Observable<boolean>
  isLoading$: Observable<boolean>
  connectedUsers$: Observable<UserInterface[]>
  user$: Observable<string>
  subscriber: Subscription
  selectedFile: File
  answerMessageId: string
  userId$: string
  imgInput: string
  img$: string
  name: string
  text: string = ''
  isConnectedListActive: boolean = false
  heightRow: number = 32
  inputHeight: number = 0
  sendJpg: string | ArrayBuffer = null
  allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']
  alertMessage: string = ''
  networkSubscriber$: Subscription
  isMessageSending$: Observable<boolean>
  notificationMessage: string = ''
  isMobile: boolean

  constructor(
    private store: Store,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }


  initializeValues() {
    this.store.dispatch(chatInitializeAction())
    this.name = localStorage.getItem('username')
    this.isMobile = this.deviceService.isMobile();
    console.log(this.isMobile)
  }

  initializeListeners() {
    this.networkSubscriber$ = this.store.pipe(select(checkNetwork)).subscribe((isOnline) => {
      if (isOnline === false) this.router.navigate(['/'])
    })
    this.isAddedUserId$ = this.store.pipe(select(isAddedUserIdSelector))
    this.isLoading$ = this.store.pipe(select(isLoading))
    this.messages$ = this.store.pipe(select(messagesSelector),map((message: MessageInterface[]) => message))
    this.subscriber = combineLatest(
      this.store.pipe(select(userIdSelector)),
      this.store.pipe(select(imageSelector), filter(Boolean))
    ).pipe(map(([userId, img]: [string, ResponseImageInterface]) => {
      if (!userId || !img) {
        return
      }
      this.img$ = img.thumbnailUrl
      this.userId$ = userId
      const user = {
        username: this.name,
        userId: userId,
        img: img.thumbnailUrl,
      }
      this.store.dispatch(addUserAction({user}))
    })).subscribe()
    this.connectedUsers$ = this.store.pipe(select(connectedUsersSelector))
    this.user$ = this.store.pipe(select(authSelector))
    this.isMessageSending$ = this.store.pipe(select(isSendSelector))
    this.store.pipe(select(getNotificationSelector), filter(Boolean)).subscribe((data:string) => {
      this.notificationMessage = data
      setTimeout(() => {
        this.notificationMessage = ''
      }, 3000)
    })
  }

  submit() {
    if (this.text.trim() === '' && !this.sendJpg) return
    const sendMessage: MessageInterface = {
      username: this.name,
      avatar: this.img$,
      userId: localStorage.getItem('userId'),
      body: this.text.trim(),
      messageId: this.idGenerator(),
      date: Date.now(),
      answerMessageId: this.answerMessageId,
      img: this.sendJpg
    }
    this.store.dispatch(sendMessageAction({sendMessage}))
    this.dropValues()
  }

  alert(msg: string, ms: number) {
    this.alertMessage = msg
    setTimeout(() => {
      this.alertMessage = ''
    }, ms)
  }

  dropValues() {
    this.text = ''
    this.imgInput = ''
    this.answerMessageId = null
    this.sendJpg = null
    this.heightRow = 32
    this.inputHeight = 0
    this.defaultTextAreaHeight()
  }

  deleteMessage(messageId) {
    this.store.dispatch(deleteMessageAction({messageId}))
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    if (!this.allowedTypes.includes(event.target.files[0].type)) {
      this.alert('Недопустимый формат изображения', 3000)
      return
    }
    if (event.target.files[0].size > 600000) {
      this.alert('Размер файла превышает 600кБ', 3000)
      return
    }
    let reader: FileReader = new FileReader()

    reader.onloadend = (e: ProgressEvent) => {
      this.sendJpg = reader.result
      if (this.inputHeight === 0) {
        this.resizeFileContainer(51)
      }
    }
    reader.readAsDataURL(this.selectedFile)
  }

  deleteImg() {
    this.sendJpg = null
    this.imgInput = ''
    if(this.answerMessageId) return
    this.resizeFileContainer(0)
  }

  answer(messageId) {
    this.answerMessageId = messageId
    if(this.answerMessageId && this.inputHeight && this.sendJpg) return
    this.resizeFileContainer(51)
  }

  deleteAnswer() {
    this.answerMessageId = null
    if(this.sendJpg) return
    this.resizeFileContainer(0)
  }

  addresedTo(username) {
    this.text = `${username}, ${this.text}`
  }

  keyDown(event) {
    if(event.keyCode == 13){
      if (this.isMobile) {
        this.checkHeightToResize()
        return true
      } else {
        if (event.shiftKey == 1) {
          this.checkHeightToResize()
        } else {
          this.submit()
          return false;
        }
      }
    }
    this.checkHeightToResize()
  }

  checkHeightToResize() {
    setTimeout(() => {
      const rowHeight = document.getElementById('textarea').scrollHeight
      if (rowHeight > this.heightRow) {
        if (rowHeight >= 128) return
        this.heightRow += 24
        this.resizeTextareaRow()
      }
      if (rowHeight < this.heightRow) {
        this.heightRow -= 24
        this.resizeTextareaRow()
      }
    }, 1)
  }

  resizeTextareaRow() {
    document.getElementById('textarea').style.height = `${this.heightRow}px`
    if (this.inputHeight) {
      document.getElementById('message-container').style.height = `calc(100% - ${this.heightRow + 20 + this.inputHeight}px)`
    } else {
      document.getElementById('message-container').style.height = `calc(100% - ${this.heightRow + 20}px)`
    }
  }

  resizeFileContainer(px: number) {
    this.inputHeight = px
    document.getElementById('message-container').style.height = `calc(100% - ${this.heightRow + 22 + this.inputHeight}px)`
    console.log(this.heightRow)
  }

  defaultTextAreaHeight() {
    document.getElementById('message-container').style.height = `calc(100% - ${this.heightRow + 22}px)`
    document.getElementById('textarea').style.height = `${this.heightRow}px`
  }

  idGenerator() {
    let S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
  }

  ngOnDestroy(): void {
    this.store.dispatch(logoutUserAuthAction())
    this.store.dispatch(logoutUserChatAction())
    localStorage.clear()
    this.subscriber.unsubscribe()
    this.networkSubscriber$.unsubscribe()
  }

}

