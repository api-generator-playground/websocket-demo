import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{
  
  text: string = '';
  messages: string[] = [];  

  constructor(private websocketService: WebsocketService, private _snackBar: MatSnackBar) {
    this.websocketService.messages.subscribe(msg => {
      let messageText = "";
      if (typeof(msg) === "string") {
        messageText = msg;
      } else if (typeof(msg) === "object") {
        messageText = JSON.stringify(msg);
      }
      this.messages.push(messageText);
      this.openSnackBar(messageText, "ACTION");
    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.websocketService.messages.next(this.text);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
