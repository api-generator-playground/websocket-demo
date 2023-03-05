import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


// const WEBSOCKET_URL = "ws://1270.0.0.1:8080/websocket";

@Injectable()
export class WebsocketService {
    private subject: AnonymousSubject<MessageEvent> | undefined;
    public messages: Subject<string>;
    public WEBSOCKET_URL = "ws://172.21.23.1:8080/websocket";

    constructor() {
        this.messages = <Subject<string>>this.connect(this.WEBSOCKET_URL).pipe(
            map(
                (response: MessageEvent): string => {
                    let data = undefined;
                    try {
                        data = JSON.parse(response.data)
                    } catch (e) {
                        data = response.data;
                    }
                    return data;
                }
            )
        );
    }

    public connect(url: string): AnonymousSubject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    private create(url: string | URL): AnonymousSubject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = new Observable((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        let observer = {
            error: (_: any) => {},
            complete: () => {},
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    if (typeof(data) === "string") {
                        ws.send(data);
                    } else if (typeof(data) === "object") {
                        ws.send(JSON.stringify(data));
                    }
                }
            }
        };
        return new AnonymousSubject<MessageEvent>(observer, observable);
    }
}