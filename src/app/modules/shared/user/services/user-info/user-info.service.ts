import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserInfoService {
    private subject = new Subject<any>();

    user: User = {
        name: '',
        admin: false,
    };

    constructor() {
    }

    getUser() {
        return this.user;
    }

    setUserName(value) {
        this.user.name = value;
        this.sentMessage(value);
    }

    sentMessage(message: string) {
        this.subject.next({text : message});
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}
