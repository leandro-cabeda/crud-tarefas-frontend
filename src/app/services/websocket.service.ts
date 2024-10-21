import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000/tasks', {
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log(`Connected front with id: ${this.socket.id}`);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected front from server socket io client');
    });
  }

  listenToEvent(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        console.log("data listenToEvent websocket serice: " + data);
        subscriber.next(data);
      });
    });
  }

  emitEvent(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
