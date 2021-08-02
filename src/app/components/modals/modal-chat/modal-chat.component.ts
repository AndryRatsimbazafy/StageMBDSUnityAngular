import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/schema/chat.schema';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';
import { CallingComponent } from './media-chat/component/calling/calling.component';
import { MediaChatComponent } from './media-chat/media-chat.component';
// @ts-ignore
import moment from 'moment';
import 'moment/locale/fr'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.css'],
})
export class ModalChatComponent implements OnInit, OnDestroy {
  selectedUserToChatWith: User = undefined;
  unsubscribeAll: Subject<boolean>;
  commId;
  localMessages = [];

  isCallModalOpen: boolean = false;
  chatLoaded = false;

  isInCall = false;
  callDialog: any;
  constructor(
    private chat: ChatService,
    private socket: Socket,
    private dialog: MatDialog,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.commId = this.data.commercialId;
    this.chatToUser(this.commId);
    this.getSelectedUserInfo();
    this.getMessages();
    this.handleVideoChatSockets();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  chatToUser(userId) {
    console.log('userid.......................', userId);
    console.log('this.commId.......................', this.commId);
    // console.log('chat to : should be commercial ID');
    // pass commercial Id as second argument here ...
    if (this.commId) {
      this.chat.emit('chat with you', userId);
      // this.chat.emit('chat with you', '6090e2f75a1fba438e1fd52f');
    }
  }

  getSelectedUserInfo() {
    this.chat
      .listen('user info')
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data) => {
        // console.log('getting selected user info', data);
        this.localMessages = [];
          this.selectedUserToChatWith = {...data, messages: [...(data.messages)]};
          console.log('HOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', this.selectedUserToChatWith)
      });
  }

  getMessages() {
    this.chat
      .listen('private message')
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({ content, from, to, files, upperDate, createdAt, indexInLocal }) => {
        console.log('==========================================new message from :', from, ' =x>', content, JSON.stringify(this.socket.ioSocket.userID));
        const fromSelf = this.socket.ioSocket.userID === from;

        if (this.selectedUserToChatWith.userID === (fromSelf ? to : from)) {
          console.log('new mess', indexInLocal, this.localMessages, JSON.stringify(this.selectedUserToChatWith.messages));
          if (this.selectedUserToChatWith.messages) {
            // console.log('has messages', indexInLocal);
            if (indexInLocal !== undefined && fromSelf && this.localMessages[indexInLocal]) { // Message is sent by actual this.selectedUserToChatWith
              (this.selectedUserToChatWith.messages as any).push({
                content,
                files,
                fromSelf,
                upperDate,
                fromUnsent: true
              });
              this.localMessages[indexInLocal].unsent = false;
              console.log(this.selectedUserToChatWith.messages);
              this.selectedUserToChatWith.messages = this.selectedUserToChatWith.messages;
            } else {
              this.selectedUserToChatWith.messages.push({
                content,
                files,
                fromSelf,
                upperDate,
                createdAt
              });
            }
          }
        }
        console.log('new mess', indexInLocal, this.localMessages, this.selectedUserToChatWith.messages);

      });
  }

  sendMessage(event) {
    if (this.selectedUserToChatWith) {
      if (event && !event.message && !event.files.length) {
        return;
      }
      const sendTime = new Date();
      const upperDate = moment(sendTime).format('Do MMMM, HH:mm');
      let files = event.files ? this.getFileNames(event.files) : [];

      const content = event.message ? event.message.trim() : '';

      let messageContent = {
        content,
        fromSelf: true,
        upperDate,
        files,
        createdAt: sendTime,
      };

      // TODO: Comment or remove the line bellow on production
      // this.selectedUserToChatWith.userID = "6090e2f75a1fba438e1fd52f"

      let message: any = {
        content,
        to: this.selectedUserToChatWith.userID,
        upperDate,
        createdAt: sendTime,
        indexInLocal: this.localMessages.length,
        unsent: true
      };

      if (event.files) {
        const formData = new FormData();
        event.files.forEach((element) => {
          formData.append('files', element);
        });
        message.files = event.files;
        this.chat.upload(formData).subscribe((res) => {
          if (res && res.success) {
            message.files = res.data;
            this.chat.emit('private message', message);
            console.log('filesss', message.files, this.localMessages[message.indexInLocal].files)
          }
        });
      } else {
        this.chat.emit('private message', message);
      }

      this.localMessages.push(message);
      // For change detection
      this.localMessages = this.localMessages;
    }
  }


  getFileNames(files) {
    let res = [];
    files.forEach((element) => {
      res.push(element.name);
    });
    return res;
  }

  insertTextAtIndices(text, obj) {
    return text.replace(/./g, function (character, index) {
      return obj[index] ? obj[index] + character : character;
    });
  }

  openCallDialog(isAnswer?: boolean, payload?: any) {
    const username = this.auth.getUsername();
    const userID = this.auth.getUserId();
    if (this.selectedUserToChatWith && username && userID) {
      this.isCallModalOpen = true;
      const dialogRef = this.dialog.open(MediaChatComponent, {
        height: ' 80vh',
        width: '90vw',
        data: {
          remote: {
            name: this.selectedUserToChatWith.username,
            socket: this.selectedUserToChatWith.userID,
          },
          me: {
            name: username,
            socket: userID,
          },
          isAnswer,
          payload,
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((_) => {
        console.log('call ended');
        this.isCallModalOpen = false;
      });
    }
  }

  handleVideoChatSockets() {
    this.socket.on('call-made', this.handleCallMade);
    this.socket.on('busy-made', this.handleBusyMade);
    }
    
    handleCallMade = async (payload): Promise<any> => {
    if (!this.isCallModalOpen && !this.isInCall) {
    const ringtone = new Audio();
    ringtone.src = environment.RINGTONE_HAPPY;
    ringtone.load();
    ringtone.play();
    ringtone.loop = true;
    this.isInCall = true
    this.callDialog = this.dialog.open(CallingComponent, {
    width: '350px',
    height: '284px',
    data: {
    name: payload.name,
    socket: payload.socket
    },
    });
    
    this.callDialog.afterClosed().subscribe(async (response) => {
    console.log('Response call', response);
    console.log('response payload', payload);
    ringtone.pause();
    if (response) {
    this.isCallModalOpen = true;
    this.openCallDialog(true, payload);
    }
    this.isInCall = false;
    });
    
    } else {
    if(payload.isFirstStep) {
    console.log('I AM BUSY....');
    this.socket.emit("busy", {to: payload.socket})
    }
    }
    };
    
    handleBusyMade = (payload) => {
    if(this.callDialog) {
    this.callDialog.close()
    }
    this.snackBar.open("La personne que vous tentez de joindre est occupée!", 'Terminer')
    }
}
