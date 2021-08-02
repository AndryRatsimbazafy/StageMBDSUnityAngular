import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/schema/chat.schema';

@Component({
  selector: 'app-chat-panel-info',
  templateUrl: './chat-panel-info.component.html',
  styleUrls: ['./chat-panel-info.component.scss']
})
export class ChatPanelInfoComponent implements OnInit {
  @Input() user: User;
  @Output() call = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  onCall() {
    this.call.emit(this.user.username)
  }

}
