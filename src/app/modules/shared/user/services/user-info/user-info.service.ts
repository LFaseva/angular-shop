import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserInfoService {

    name: string = 'jon';

    constructor() {}

    getUser() {
        return this.name;
    }
    setUser(value) {
        this.name = value;
    }
}
