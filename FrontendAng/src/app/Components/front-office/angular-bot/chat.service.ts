import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export class Message {
    constructor(public author: string, public content: string) {}
}
@Injectable()
export class ChatService {
    constructor() {}
    conversation = new Subject<Message[]>();
    messageMap = {
        "Hi": "Hello",
        "who are you": "My name is WinSprint Bot",
        "what is your role": "Just guide for the user",
        "defaultmsg": "I can't understand your text. Can you please repeat",
        "describe your app":"it's a fitness and nutrition app ",
        "how to use it?":"Register then acess to home where you will finds workouts prgrams,diet examples,bmi calculator ",
        "is it free?":"you can find free  and paid programs",
        "alright thanks":"welcome!feel free to ask me for more infos"


    }
    getBotAnswer(msg: string) {
        const userMessage = new Message('user', msg);
        this.conversation.next([userMessage]);
        const botMessage = new Message('bot', this.getBotMessage(msg));
        setTimeout(()=>{
            this.conversation.next([botMessage]);
        }, 1500);
    }
    getBotMessage(question: string){
        let answer = this.messageMap[question as keyof typeof this.messageMap];
        return answer || this.messageMap['defaultmsg'];
    }
}
